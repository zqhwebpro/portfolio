using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Mvc;
using Ninject;
using MischiefStore.Domain.Abstract;
using MischiefStore.Domain.Concrete;

namespace MischiefStore.WebUI.Infrastructure
{
    public class NinjectDependencyResolver : IDependencyResolver
    {
        private IKernel kernel;

        public NinjectDependencyResolver(IKernel kernelParam)
        {
            kernel = kernelParam;
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        private void AddBindings()
        {
            // Bind EF Product Repository
            kernel.Bind<IProductRepository>().To<EFProductRepository>();

            // Configure and Bind Email Order Processor
            EmailSettings emailSettings = new EmailSettings
            {
                WriteAsFile = bool.TryParse(ConfigurationManager.AppSettings["Email.WriteAsFile"], out bool writeAsFile) && writeAsFile
            };

            kernel.Bind<IOrderProcessor>().To<EmailOrderProcessor>()
                .WithConstructorArgument("settings", emailSettings);
        }
    }
}
