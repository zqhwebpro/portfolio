using System.Collections.Generic;
using System.Linq;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Abstract
{
    public interface IProductRepository
    {
        IQueryable<Product> Products { get; }
        void SaveProduct(Product product);
        Product DeleteProduct(int productID);
    }
}
