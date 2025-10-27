using AutoMapper;
using Server.Domain.Entities;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Server.Infrastructure.Interfaces;

namespace Server.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IMapper _mapper;
        public OrderService(IAppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Order> RegisterOrder(SpreadsheetRowDto row)
        {
            var order = await _dbContext.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == row.OrderNumber);
            
            if (order == null)
            {
                var newOrder = _mapper.Map<Order>(row);
                _dbContext.Orders.Add(newOrder);
                await _dbContext.SaveChangesAsync();
                order = newOrder;
            }

            return order;
        }
    }
}
