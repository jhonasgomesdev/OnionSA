using AutoMapper;
using Server.Domain.Entities;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using Server.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Server.Application.Services
{
    public class LastSpreadsheetService : ILastSpreadsheetService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IMapper _mapper;
        public LastSpreadsheetService(IAppDbContext dbContext, IMapper mapper) 
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task RegisterLastSpreadsheet(IEnumerable<SpreadsheetRowDto> rows)
        {
            var existingSpreadsheets = await _dbContext.LastSpreadsheets.ToListAsync();
            var newLastSpreadsheets = _mapper.Map<List<LastSpreadsheet>>(rows);

            if (existingSpreadsheets.Any())
            {
                _dbContext.LastSpreadsheets.RemoveRange(existingSpreadsheets);
            }
            
            await _dbContext.LastSpreadsheets.AddRangeAsync(newLastSpreadsheets);
            await _dbContext.SaveChangesAsync();
        }
    }
}
