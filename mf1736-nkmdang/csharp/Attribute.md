# Learn about Attribute in C#

## Define

- Attributes are used in C# to convey declarative information or metadata about various code elements such as methods, assemblies, properties, types, etc. Attributes are added to the code by using a declarative tag that is placed using square brackets ([ ]) on top of the required code element. There are two types of Attributes implementations provided by the .NET Framework are: **Predefined Attributes** and **Custom Attributes**.

## Properties of Attributes

- Attributes can have arguments just like methods, properties, etc. can have arguments.
- Attributes can have zero or more parameters.
- Different code elements such as methods, assemblies, properties, types, etc. can have one or multiple attributes.
- Reflection can be used to obtain the metadata of the program by accessing the attributes at run-time.
- Attributes are generally derived from the **System. Attribute Class.**

  | Attribute                   | Description                                                                                                                        |
  | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
  | AttributeUsageAttribute     | This attribute specifies the usage of a different attribute.                                                                       |
  | CLSCompliantAttribute       | This attribute shows if a particular code element complies with the Common Language Specification.                                 |
  | ContextStaticAttribute      | This attribute designates that a static field should not be shared between contexts.                                               |
  | FlagsAttribute              | The FlagsAttribute specifies that an enumeration can be used as a set of flags. This is most commonly used with bitwise operators. |
  | LoaderOptimizationAttribute | This attribute sets the optimization policy for the default loader in the main method.                                             |
  | NonSerializedAttribute      | This attribute signifies that the field of the serializable class should not be serialized.                                        |
  | ObsoleteAttribute           | This attribute marks the code elements that are obsolete i.e. not in use anymore.                                                  |
  | SerializableAttribute       | This attribute signifies that the field of the serializable class can be serialized.                                               |
  | ThreadStaticAttribute       | This attribute indicates that there is a unique static field value for each thread.                                                |
  | DllImportAttribute          | This attribute indicates that the method is a static entry point as shown by the unmanaged DLL.                                    |

## Predefined Attributes

### 1. CLSCompliantAttribute

The Common Language Specification (CLS) in C# is a set of rules and constraints that specify a subset of the features and behaviors that a .NET programming language must support to ensure interoperability between different .NET languages.

Here are some key aspects of the Common Language Specification (CLS):

1. **Data Types**: The CLS specifies a set of data types that all .NET languages must support. These include basic data types like integers, floating-point numbers, characters, and more. It also includes rules about the size and representation of these data types.

2. **Naming Conventions**: The CLS defines rules for identifier names, including rules for case sensitivity, reserved words, and naming conventions for various code elements like classes, methods, and properties.

3. **Member Accessibility**: It defines rules for the accessibility of members (e.g., public, protected, private) and enforces a common set of access modifiers.

4. **Method Signatures**: The CLS specifies rules for method signatures, including parameter types and return types. It ensures that method overloads are distinguishable based on the number or type of parameters.

5. **Exception Handling**: It defines how exceptions should be handled, ensuring that exceptions raised in one language can be caught and handled by code in another language.

6. **Inheritance and Polymorphism**: The CLS provides guidelines for inheritance and polymorphism, including rules for method overriding and virtual methods.

7. **Delegates and Events**: It specifies the behavior of delegates and events to ensure that they work consistently across languages.

8. **Attributes**: The CLS defines rules for attribute usage, ensuring that custom attributes can be used consistently in all .NET languages.

Some example about CLSCompliantAttribute

**Example 1:** Here, it will not give any warning message, and the code compiles successfully.

    // C# program to demonstrate CLSCompliantAttribute
    using System;

    // CLSCompliantAttribute applied to entire assembly
    [assembly:CLSCompliant(true)]

      public class GFG {

      // Main Method
      public static void Main(string[] args)
      {
        Console.WriteLine("GeeksForGeeks");
      }
    }

**Output:**

    GeeksForGeeks

**Example 2:** This code will give a warning message by the compiler.

    // C# program to demonstrate CLSCompliantAttribute
    // giving a warning message
    using System;

    // CLSCompliantAttribute applied to entire assembly
    [assembly:CLSCompliant(true)]

        public class GFG {
        public uint z;

    }

    class GFG2 {

    // Main Method
    public static void Main(string[] args)
    {
    Console.WriteLine("GeeksForGeeks");
    }

    }

**Warning:**

    prog.cs(9,14): warning CS3003: Type of `GFG.z’ is not CLS-compliant

### 2. FlagsAttribute

**The FlagsAttribute** specifies that an enumeration can be used as a set of flags. This is most commonly used with bitwise operators.

**The FlagsAttribute** is used to indicate that an enumeration is intended to be used as a set of bitwise flags. **The FlagsAttribute** is used to provide a hint to the compiler and developers that the values of the enumeration can be combined using bitwise OR operations to represent multiple options or states simultaneously.

**Example 3:**

    // C# program to demonstrate FlagsAttribute
    using System;

    class GFG {

        // Enum defined without FlagsAttribute.
        enum Colours { Red = 1,
              Blue = 2,
              Pink = 4,
              Green = 8
        }

        // Enum defined with FlagsAttribute.
        [Flags] enum ColoursFlags { Red = 1,
                      Blue = 2,
                      Pink = 4,
                      Green = 8
        }

        // Main Method
        public static void Main(string[] args)
        {
          Console.WriteLine((Colours.Red | Colours.Blue).ToString());
          Console.WriteLine((ColoursFlags.Red | ColoursFlags.Blue).ToString());
        }

    }

**Output:**

    3
    Red,Blue

### 3. ObsoleteAttribute

**The ObsoleteAttribute** in C# is used to mark program elements (such as classes, methods, properties, fields, or even whole assemblies) as obsolete or deprecated. It indicates that the marked element is no longer recommended for use and may be removed or changed in future versions of the code. When developers encounter an element marked with the ObsoleteAttribute, they should consider using an alternative or updated element.

**The ObsoleteAttribute** allows you to provide a custom message explaining why the element is considered obsolete and, optionally, instructions on what to use instead. This message is typically displayed as a warning or error when code that uses the marked element is compiled, depending on how the attribute is configured.

**Example 4:**

    // C# program to demonstrate ObsoleteAttribute
    using System;

    class GFG {

        // The method1() is marked as obsolete
        [Obsolete("method1 is obsolete", true)] static void method1()
        {
          Console.WriteLine("This is method1");
        }

        static void method2()
        {
          Console.WriteLine("This is method2");
        }

        public static void Main(string[] args)
        {
          method1(); // Compiler error as method1() is obsolete
          method2();
        }

    }

**Compile Errors:**

    prog.cs(18,3): error CS0619: `GFG.method1()’ is obsolete: `method1 is obsolete’

## Custom Attributes

Custom attributes can be created in C# for attaching declarative information to methods, assemblies, properties, types, etc. in any way required. This increases the extensibility of the .NET framework. Steps for creating Custom Attributes:

- Define a custom attribute class that is derived from System. Attribute class.
- The custom attribute class name should have the suffix Attribute.
- Use the attribute AttributeUsage to specify the usage of the custom attribute class created.
- Create the constructor and the accessible properties of the custom attribute class.

**Example:**

**1. Create a Custom Attribute:**

    // MyCustomAttribute.cs
    using System;

    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    sealed class MyCustomAttribute : Attribute
    {
        public string Description { get; }

        public MyCustomAttribute(string description)
        {
            Description = description;
        }
    }

**2. Use Custom Attribute:**

    // MyClass.cs
    [MyCustom("This is a custom attribute.")]
    public class MyClass
    {
        // Class members
    }

**3. Access Custom Attribute by Reflection:**

    // Program.cs
    using System;
    using System.Reflection;

    class Program
    {
        static void Main()
        {
            Type type = typeof(MyClass);
            MyCustomAttribute attribute = (MyCustomAttribute)type.GetCustomAttribute(typeof(MyCustomAttribute), false);

            if (attribute != null)
            {
                string description = attribute.Description;
                Console.WriteLine($"Description: {description}");
            }
        }
    }

## References

- GeeksforGeeks: [Attributes in C#](https://www.geeksforgeeks.org/attributes-in-c-sharp/)
- [ChatGPT](https://chat.openai.com/)
