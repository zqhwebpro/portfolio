using System.Collections.Generic;
using System.Linq;
using MischiefStore.Domain.Abstract;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Concrete
{
    public class EFProductRepository : IProductRepository
    {
        private readonly EFDbContext context = new EFDbContext();

        public IQueryable<Product> Products => context.Products;

        public void SaveProduct(Product product)
        {
            if (product.ProductID == 0)
            {
                context.Products.Add(product);
            }
            else
            {
                Product dbEntry = context.Products.Find(product.ProductID);
                if (dbEntry != null)
                {
                    dbEntry.Name = product.Name;
                    dbEntry.Description = product.Description;
                    dbEntry.Price = product.Price;
                    dbEntry.Category = product.Category;
                    dbEntry.IconClass = product.IconClass;
                    dbEntry.InStock = product.InStock;

                    if (product.ImageData != null)
                    {
                        dbEntry.ImageData = product.ImageData;
                        dbEntry.ImageMimeType = product.ImageMimeType;
                    }
                }
            }
            context.SaveChanges();
        }

        public Product DeleteProduct(int productID)
        {
            Product dbEntry = context.Products.Find(productID);
            if (dbEntry != null)
            {
                context.Products.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
