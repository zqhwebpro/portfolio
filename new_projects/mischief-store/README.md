# Mischief & Magic Co. — Enterprise ASP.NET MVC 5 E-Commerce Architecture

> **A playful, irreverent novelty boutique built upon strict, rock-solid Enterprise N-Tier C# architecture.**

[![.NET Framework](https://img.shields.io/badge/.NET%20Framework-4.8-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![ASP.NET MVC](https://img.shields.io/badge/ASP.NET%20MVC-5.2.7-blue)](https://dotnet.microsoft.com/apps/aspnet/mvc)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-6.4.4-6C2E9C)](https://docs.microsoft.com/en-us/ef/ef6/)
[![Ninject DI](https://img.shields.io/badge/Dependency%20Injection-Ninject%203.3-00C4B4)](http://www.ninject.org/)
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap%203.4%20%2B%20Custom%20Carnival%20CSS-563D7C?logo=bootstrap)](https://getbootstrap.com/)

---

## 🎪 Executive Summary & Business Domain

**Mischief & Magic Co.** is a specialty boutique e-commerce web application catering to amateur illusionists, corporate tricksters, and novelty gag enthusiasts. The application balances a high-energy, humorous carnival aesthetic with strict enterprise-grade software patterns.

### Core Architectural Capabilities
- **Decoupled N-Tier Architecture:** Clean separation between `MischiefStore.Domain` (pure business logic, entities, EF6 data layer) and `MischiefStore.WebUI` (ASP.NET MVC 5 presentation, controllers, custom model binders, custom HTML helpers).
- **Inversion of Control & Dependency Injection:** Powered by **Ninject** (`Ninject.Web.Common`), binding decoupled abstractions (`IProductRepository`, `IOrderProcessor`) to concrete implementations (`EFProductRepository`, `EmailOrderProcessor`).
- **Entity Framework 6 Code-First:** Model-driven database design with automated schema generation, migrations, and a database initializer (`DatabaseInitializer.cs`) seeding 14 specialized gags and magic items.
- **Session-Decoupled Custom Model Binder:** `CartModelBinder` registers with `ModelBinders.Binders` in `Global.asax.cs`, injecting the user's `Cart` into controller actions without coupling controller methods directly to `HttpContext.Session`.
- **Custom Pagination Razor HTML Helper:** Extensible `@Html.PageLinks` extension generating responsive, SEO-friendly pagination links.
- **Back-Office CRUD Administration:** Protected `AdminController` allowing store managers to create, edit, delete, and upload binary image assets (`HttpPostedFileBase`) stored directly in EF6 BLOB columns.

---

## 🏛️ Solution & Project Structure

```
MischiefStore/
│
├── MischiefStore.sln                               # Visual Studio Solution File
│
├── MischiefStore.Domain/                           # Core Domain & Data Layer Class Library
│   ├── MischiefStore.Domain.csproj
│   ├── Abstract/
│   │   ├── IProductRepository.cs                   # Repository contract (IQueryable<Product>, Save, Delete)
│   │   └── IOrderProcessor.cs                      # Order dispatch contract (ProcessOrder)
│   ├── Concrete/
│   │   ├── EFDbContext.cs                          # EF6 DbContext with DbSets and model configurations
│   │   ├── EFProductRepository.cs                  # Concrete EF6 repository implementation
│   │   ├── EmailOrderProcessor.cs                  # SMTP order confirmation dispatcher
│   │   └── DatabaseInitializer.cs                  # Code-first seeder with 14 products & categories
│   ├── Entities/
│   │   ├── Product.cs                              # Domain entity with DataAnnotations & BLOB properties
│   │   ├── Cart.cs                                 # Pure domain cart engine with CartLine sub-entities
│   │   └── ShippingDetails.cs                      # Checkout entity with strict validation rules
│   └── Properties/
│       └── AssemblyInfo.cs
│
└── MischiefStore.WebUI/                            # ASP.NET MVC 5 Presentation Web Application
    ├── MischiefStore.WebUI.csproj
    ├── Global.asax & Global.asax.cs                # App bootstrap, route registration, model binder hook
    ├── Web.config                                  # LocalDB connection strings, MVC assembly bindings
    ├── App_Start/
    │   ├── RouteConfig.cs                          # Custom SEO-friendly route definitions
    │   └── NinjectWebCommon.cs                     # Ninject IoC container lifecycle bootstrapper
    ├── Infrastructure/
    │   ├── NinjectDependencyResolver.cs            # MVC IDependencyResolver adapter for Ninject
    │   └── Binders/
    │       └── CartModelBinder.cs                  # ASP.NET Session-to-Cart Model Binder
    ├── HtmlHelpers/
    │   └── PagingHelpers.cs                        # Custom Razor HTML helper (@Html.PageLinks)
    ├── Models/
    │   ├── PagingInfo.cs                           # Pagination metadata viewmodel
    │   ├── ProductsListViewModel.cs                # Catalogue grid viewmodel
    │   └── CartIndexViewModel.cs                   # Shopping cart viewmodel
    ├── Controllers/
    │   ├── ProductController.cs                    # Paginated catalogue & BLOB image streaming
    │   ├── NavController.cs                        # Category sidebar sub-action
    │   ├── CartController.cs                       # Add/Remove/Summary/Checkout actions
    │   └── AdminController.cs                       # CRUD back-office controller
    ├── Content/
    │   └── Site.css                                # Vibrant carnival theme styling & micro-animations
    └── Views/
        ├── _ViewStart.cshtml
        ├── Shared/
        │   ├── _Layout.cshtml                      # Main storefront master layout
        │   ├── _AdminLayout.cshtml                 # Back-office admin master layout
        │   └── _ProductSummary.cshtml              # Reusable product card partial view
        ├── Product/
        │   └── List.cshtml                         # Paginated catalogue view
        ├── Nav/
        │   └── Menu.cshtml                         # Category navigation pills partial view
        ├── Cart/
        │   ├── Index.cshtml                        # Shopping cart line items & actions
        │   ├── Summary.cshtml                      # Floating header cart widget
        │   ├── Checkout.cshtml                     # Shipping coordinates & validation form
        │   └── Completed.cshtml                    # Order success confirmation receipt
        └── Admin/
            ├── Index.cshtml                        # Product inventory table
            └── Edit.cshtml                         # Product create/edit form with file upload
```

---

## ⚡ Key Architectural Patterns & Implementations

### 1. Custom Session Cart Model Binder (`CartModelBinder.cs`)
Rather than forcing every controller action to inspect `Session["Cart"]`, the custom `CartModelBinder` resolves `Cart` instances automatically from the HTTP Session:

```csharp
public class CartModelBinder : IModelBinder
{
    private const string sessionKey = "Cart";

    public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
    {
        Cart cart = null;
        if (controllerContext.HttpContext.Session != null)
        {
            cart = (Cart)controllerContext.HttpContext.Session[sessionKey];
        }

        if (cart == null)
        {
            cart = new Cart();
            if (controllerContext.HttpContext.Session != null)
            {
                controllerContext.HttpContext.Session[sessionKey] = cart;
            }
        }

        return cart;
    }
}
```

### 2. Ninject Dependency Injection Resolver (`NinjectDependencyResolver.cs`)
All repository and infrastructure dependencies are injected through constructor injection, configured in `NinjectWebCommon.cs`:

```csharp
private static void RegisterServices(IKernel kernel)
{
    kernel.Bind<IProductRepository>().To<EFProductRepository>();
    
    EmailSettings emailSettings = new EmailSettings
    {
        WriteAsFile = bool.Parse(ConfigurationManager.AppSettings["Email.WriteAsFile"] ?? "true")
    };

    kernel.Bind<IOrderProcessor>().To<EmailOrderProcessor>()
        .WithConstructorArgument("settings", emailSettings);
}
```

### 3. SEO-Friendly Custom Route Mapping (`RouteConfig.cs`)
Supports clean URLs like `/` ➔ `/Products/Page2` ➔ `/Classic%20Gags/Page1`:

```csharp
routes.MapRoute(
    name: null,
    url: "{category}/Page{page}",
    defaults: new { controller = "Product", action = "List" },
    constraints: new { page = @"\d+" }
);
```

### 4. Custom Razor Pagination Helper (`PagingHelpers.cs`)
Enables clean Razor syntax: `@Html.PageLinks(Model.PagingInfo, x => Url.Action("List", new { page = x, category = Model.CurrentCategory }))`:

```csharp
public static MvcHtmlString PageLinks(this HtmlHelper html, PagingInfo pagingInfo, Func<int, string> pageUrl)
{
    StringBuilder result = new StringBuilder();
    for (int i = 1; i <= pagingInfo.TotalPages; i++)
    {
        TagBuilder tag = new TagBuilder("a");
        tag.MergeAttribute("href", pageUrl(i));
        tag.InnerHtml = i.ToString();
        tag.AddCssClass("btn btn-default");
        if (i == pagingInfo.CurrentPage)
        {
            tag.AddCssClass("selected btn-primary");
        }
        result.Append(tag.ToString());
    }
    return MvcHtmlString.Create(result.ToString());
}
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Visual Studio 2019 / 2022 (with ASP.NET and web development workload).
- .NET Framework 4.8 Developer Pack.
- SQL Server Express / LocalDB (included with Visual Studio).

### Building & Running
1. Open `MischiefStore.sln` in Visual Studio.
2. Restore NuGet packages (`Update-Package -reinstall` or auto-restore).
3. Set `MischiefStore.WebUI` as the Startup Project.
4. Press `F5` or `Ctrl+F5` to build and launch in IIS Express.
5. Entity Framework 6 will automatically create the `EFDbContext` database in `(localdb)\MSSQLLocalDB` and execute `DatabaseInitializer` to seed all products and categories.
6. Access the public storefront at `http://localhost:[port]/` and the admin portal at `http://localhost:[port]/Admin/Index`.

---

## 🧪 Verification & Interactive Preview

A high-fidelity client simulation is available in [`index.html`](./index.html) allowing live testing in any modern browser without needing an active Windows IIS/.NET host.
