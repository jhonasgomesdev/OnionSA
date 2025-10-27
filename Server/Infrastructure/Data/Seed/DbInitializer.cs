using Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Server.Infrastructure.Data.Seed
{
    public class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Products.Any())
                return;

            context.Products.AddRange(
                new Product { Id = 1, Name = "Celular", Price = 1000 },
                new Product { Id = 2, Name = "Notebook", Price = 3000 },
                new Product { Id = 3, Name = "Televisão", Price = 5000 }
            );

            context.SaveChanges();
        }
    }
}
