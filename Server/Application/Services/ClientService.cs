using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using Server.Domain.Entities;
using Server.Infrastructure.Interfaces;

namespace Server.Application.Services
{
    public class ClientService : IClientService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IMapper _mapper;
        public ClientService(IAppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Client> RegisterClient(SpreadsheetRowDto row)
        {
            var existingClient = await _dbContext.Clients.AsNoTracking().FirstOrDefaultAsync(c => c.IdentificationDocument == row.Document);

            if (existingClient == null) 
            {
                var newClient = _mapper.Map<Client>(row);

                _dbContext.Clients.Add(newClient);
                await _dbContext.SaveChangesAsync();
                existingClient = newClient;
            }

            return _mapper.Map<Client>(existingClient);
        }
    }
}
