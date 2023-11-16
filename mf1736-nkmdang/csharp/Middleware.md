# Learn about Middleware

## Define

**Middleware** is software that's assembled into an app pipeline to handle requests and responses. Each component:

- Chooses whether to pass the request to the next component in the pipeline.
- Can perform work before and after the next component in the pipeline.

## Some relate information

**Request delegates** are used to build the request pipeline. The request delegates handle each HTTP request.

**Request delegates** are configured using Run, Map, and Use extension methods. An individual request delegate can be specified in-line as an anonymous method (called in-line middleware), or it can be defined in a reusable class. These reusable classes and in-line anonymous methods are middleware, also called middleware components. Each middleware component in the request pipeline is responsible for invoking the next component in the pipeline or short-circuiting the pipeline. When a middleware short-circuits, it's called a terminal middleware because it prevents further middleware from processing the request.

Migrate HTTP handlers and modules to ASP.NET Core middleware explains the difference between request pipelines in ASP.NET Core and ASP.NET 4.x and provides additional middleware samples.

## Middleware code analysis

### Create a middleware pipeline with WebApplication

The ASP.NET Core request pipeline consists of a sequence of request delegates, called one after the other. The following diagram demonstrates the concept. The thread of execution follows the black arrows.

![](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/index/_static/request-delegate-pipeline.png?view=aspnetcore-7.0)

Each delegate can perform operations before and after the next delegate. Exception-handling delegates should be called early in the pipeline, so they can catch exceptions that occur in later stages of the pipeline.

The simplest possible ASP.NET Core app sets up a single request delegate that handles all requests. This case doesn't include an actual request pipeline. Instead, a single anonymous function is called in response to every HTTP request.

    // C#
    var builder = WebApplication.CreateBuilder(args);
    var app = builder.Build();

    app.Run(async context =>
    {
        await context.Response.WriteAsync("Hello world!");
    });

    app.Run();

Chain multiple request delegates together with Use. The next parameter represents the next delegate in the pipeline. You can short-circuit the pipeline by not calling the next parameter. You can typically perform actions both before and after the next delegate, as the following example demonstrates:

    // C#
    var builder = WebApplication.CreateBuilder(args);
    var app = builder.Build();

    app.Use(async (context, next) =>
    {
        // Do work that can write to the Response.
        await next.Invoke();
        // Do logging or other work that doesn't write to the Response.
    });

    app.Run(async context =>
    {
        await context.Response.WriteAsync("Hello from 2nd delegate.");
    });

    app.Run();

## Middleware order

The following diagram shows the complete request processing pipeline for ASP.NET Core MVC and Razor Pages apps. You can see how, in a typical app, existing middlewares are ordered and where custom middlewares are added. You have full control over how to reorder existing middlewares or inject new custom middlewares as necessary for your scenarios.

![](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/index/_static/middleware-pipeline.svg?view=aspnetcore-7.0)

The Endpoint middleware in the preceding diagram executes the filter pipeline for the corresponding app type—MVC or Razor Pages.

The Routing middleware in the preceding diagram is shown following Static Files. This is the order that the project templates implement by explicitly calling app.UseRouting. If you don't call [app.UseRouting](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.userouting?view=aspnetcore-7.0), the Routing middleware runs at the beginning of the pipeline by default. For more information, see [Routing](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-7.0).

![](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/index/_static/mvc-endpoint.svg?view=aspnetcore-7.0)

The order that middleware components are added in the _Program.cs_ file defines the order in which the middleware components are invoked on requests and the reverse order for the response. The order is critical for security, performance, and functionality.

The following highlighted code in _Program.cs_ adds security-related middleware components in the typical recommended order:

    // Programs.cs
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using WebMiddleware.Data;

    var builder = WebApplication.CreateBuilder(args);

    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();

    builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    builder.Services.AddRazorPages();
    builder.Services.AddControllersWithViews();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseMigrationsEndPoint();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    // app.UseCookiePolicy();

    app.UseRouting();
    // app.UseRateLimiter();
    // app.UseRequestLocalization();
    // app.UseCors();

    app.UseAuthentication();
    app.UseAuthorization();
    // app.UseSession();
    // app.UseResponseCompression();
    // app.UseResponseCaching();

    app.MapRazorPages();
    app.MapDefaultControllerRoute();

    app.Run();

In the preceding code:

- Middleware that is not added when creating a new web app with individual users accounts is commented out.
- Not every middleware appears in this exact order, but many do. For example:
  - UseCors, UseAuthentication, and UseAuthorization must appear in the order shown.
  - UseCors currently must appear before UseResponseCaching. This requirement is explained in GitHub issue dotnet/aspnetcore #23218.
  - UseRequestLocalization must appear before any middleware that might check the request culture, for example, app.UseStaticFiles().
  - UseRateLimiter must be called after UseRouting when rate limiting endpoint specific APIs are used. For example, if the [EnableRateLimiting] attribute is used, UseRateLimiter must be called after UseRouting. When calling only global limiters, UseRateLimiter can be called before UseRouting.

The following Program.cs code adds middleware components for common app scenarios:

1.  Exception/error handling
    - When the app runs in the Development environment:
      - Developer Exception Page Middleware ([UseDeveloperExceptionPage](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.developerexceptionpageextensions.usedeveloperexceptionpage)) reports app runtime errors.
      - Database Error Page Middleware ([UseDatabaseErrorPage](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.databaseerrorpageextensions.usedatabaseerrorpage?view=aspnetcore-7.0)) reports database runtime errors.
    - When the app runs in the Production environment:
      - Exception Handler Middleware ([UseExceptionHandler](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.exceptionhandlerextensions.useexceptionhandler?view=aspnetcore-7.0)) catches exceptions thrown in the following middlewares.
      - HTTP Strict Transport Security Protocol (HSTS) Middleware ([UseHsts](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-7.0)) adds the Strict-Transport-Security header.
2.  HTTPS Redirection Middleware ([UseHttpsRedirection](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.httpspolicybuilderextensions.usehttpsredirection?view=aspnetcore-7.0)) redirects HTTP requests to HTTPS.
3.  Static File Middleware ([UseStaticFiles](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.staticfileextensions.usestaticfiles?view=aspnetcore-7.0)) returns static files and short-circuits further request processing.
4.  Cookie Policy Middleware ([UseCookiePolicy](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.cookiepolicyappbuilderextensions.usecookiepolicy?view=aspnetcore-7.0)) conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
5.  Routing Middleware ([UseRouting](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.userouting?view=aspnetcore-7.0)) to route requests.
6.  Authentication Middleware ([UseAuthentication](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.authappbuilderextensions.useauthentication?view=aspnetcore-7.0)) attempts to authenticate the user before they're allowed access to secure resources.
7.  Authorization Middleware ([UseAuthorization](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.authorizationappbuilderextensions.useauthorization?view=aspnetcore-7.0)) authorizes a user to access secure resources.
8.  Session Middleware ([UseSession](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.sessionmiddlewareextensions.usesession)) establishes and maintains session state. If the app uses session state, call Session Middleware after Cookie Policy Middleware and before MVC Middleware.
9.  Endpoint Routing Middleware ([UseEndpoints](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.endpointroutingapplicationbuilderextensions.useendpoints) with [MapRazorPages](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.razorpagesendpointroutebuilderextensions.maprazorpages)) to add Razor Pages endpoints to the request pipeline.

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCookiePolicy();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseSession();
        app.MapRazorPages();

## References

- Microsoft Learn: [ASP.NET Core Middleware](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-7.0)
