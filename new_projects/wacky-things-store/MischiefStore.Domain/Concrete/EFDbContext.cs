using System.Data.Entity;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Concrete
{
    public class EFDbContext : DbContext
    {
        public EFDbContext() : base("EFDbContext")
        {
            // Set database initializer for seeding sample novelty & magic gifts
            Database.SetInitializer(new DatabaseInitializer());
        }

        public DbSet<Product> Products { get; set; }
    }
}
