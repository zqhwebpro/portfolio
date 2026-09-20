using System.Web.Mvc;
using System.Web.Routing;
using MischiefStore.Domain.Entities;
using MischiefStore.WebUI.Infrastructure.Binders;

namespace MischiefStore.WebUI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            // Register Custom Cart Model Binder to bind Session-based shopping cart
            ModelBinders.Binders.Add(typeof(Cart), new CartModelBinder());
        }
    }
}
