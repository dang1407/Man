# Learn about Dependency Injection

.NET supports the dependency injection (DI) software design pattern, which is a technique for achieving Inversion of Control (IoC) between classes and their dependencies. Dependency injection in .NET is a built-in part of the framework, along with configuration, logging, and the options pattern.

A **dependency** is an object that another object depends on. Examine the following MessageWriter class with a Write method that other classes depend on:

    public class MessageWriter
    {
        public void Write(string message)
        {
            Console.WriteLine($"MessageWriter.Write(message: \"{message}\")");
        }
    }

A class can create an instance of the **MessageWriter** class to make use of its Write method. In the following example, the **MessageWriter** class is a dependency of the **Worker** class:

    public class Worker : BackgroundService
    {
        private readonly MessageWriter _messageWriter = new MessageWriter();

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _messageWriter.Write($"Worker running at: {DateTimeOffset.Now}");
                await Task.Delay(1000, stoppingToken);
            }
        }
    }

The class creates and directly depends on the MessageWriter class. Hard-coded dependencies, such as in the previous example, are problematic and should be avoided for the following reasons:

- To replace MessageWriter with a different implementation, the Worker class must be modified.
- If MessageWriter has dependencies, they must also be configured by the Worker class. In a large project with multiple classes depending on MessageWriter, the configuration code becomes scattered across the app.
- This implementation is difficult to unit test. The app should use a mock or stub MessageWriter class, which isn't possible with this approach.

Dependency injection addresses these problems through:

- The use of an interface or base class to abstract the dependency implementation.
- Registration of the dependency in a service container. .NET provides a built-in service container, IServiceProvider. Services are typically registered at the app's start-up and appended to an IServiceCollection. Once all services are added, you use BuildServiceProvider to create the service container.
- Injection of the service into the constructor of the class where it's used. The framework takes on the responsibility of creating an instance of the dependency and disposing of it when it's no longer needed.

## References

- Microsoft Learn: [.NET dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
