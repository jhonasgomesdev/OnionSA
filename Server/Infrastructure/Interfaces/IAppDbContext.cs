using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;

namespace Server.Infrastructure.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Client> Clients { get; }
        DbSet<Order> Orders { get; }
        DbSet<Product> Products { get; }
        DbSet<OrderProduct> OrderProducts { get; }
        DbSet<LastSpreadsheet> LastSpreadsheets { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
