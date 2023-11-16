using Microsoft.AspNetCore.Mvc;
using MISA.WebFresher072023.MF1736.NKMDANG;
using MISA.WebFresher072023.MF1736.NKMDANG.Application;
using MISA.WebFresher072023.MF1736.NKMDANG.Domain;
using MISA.WebFresher072023.MF1736.NKMDANG.Infrastructure;
using MISA.WebFresher072023.MF1736.NKMDANG.Middleware;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions( options =>
    {
        // Don't have naming policy, return raw Property
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.Converters.Add(new LocalTimeZoneConverter()); 
    }
    );

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Khai báo các Dependency Injection
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeValidate, EmployeeValidate>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IDepartmentValidate, DepartmentValidate>();

builder.Services.AddScoped<IConfigRepository, ConfigRepository>();  
builder.Services.AddScoped<IConfigService, ConfigService>();    

builder.Services.AddScoped<IDateConfigurationService, DateConfigurationService>();    
builder.Services.AddScoped<IDateConfigurationRepository, DateConfigurationRepository>();

// Unit Of Work
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();  

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Gán connectionString
AccessDatabase.connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Grant permission to FE fetch API
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
})
    );


builder.Services.AddControllers().ConfigureApiBehaviorOptions(
    options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState.Values.SelectMany(x => x.Errors);
            return new BadRequestObjectResult(new BaseException()
            {
                ErrorCode = 400,
                UserMessage = "Lỗi từ người dùng",
                DevMessage = "Lỗi dữ liệu đầu vào từ người dùng",
                TraceId = "",
                MoreInfo = "",
                Errors = errors
            }.ToString() ?? "");
        };
    }
    );


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("corsapp");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

app.Run();
