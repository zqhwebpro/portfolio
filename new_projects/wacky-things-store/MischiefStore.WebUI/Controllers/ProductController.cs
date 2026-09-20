using System.Linq;
using System.Web.Mvc;
using MischiefStore.Domain.Abstract;
using MischiefStore.Domain.Entities;
using MischiefStore.WebUI.Models;

namespace MischiefStore.WebUI.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository repository;
        public int PageSize = 4;

        public ProductController(IProductRepository productRepository)
        {
            this.repository = productRepository;
        }

        public ViewResult List(string category, int page = 1)
        {
            var filteredProducts = repository.Products
                .Where(p => category == null || p.Category == category);

            ProductsListViewModel model = new ProductsListViewModel
            {
                Products = filteredProducts
                    .OrderBy(p => p.ProductID)
                    .Skip((page - 1) * PageSize)
                    .Take(PageSize),
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = filteredProducts.Count()
                },
                CurrentCategory = category
            };

            return View(model);
        }

        public FileContentResult GetImage(int productID)
        {
            Product prod = repository.Products
                .FirstOrDefault(p => p.ProductID == productID);

            if (prod != null && prod.ImageData != null)
            {
                return File(prod.ImageData, prod.ImageMimeType);
            }
            return null;
        }
    }
}
