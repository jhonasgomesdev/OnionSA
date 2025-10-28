using MiniExcelLibs;
using FluentValidation;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using System.Text.RegularExpressions;
using Server.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Server.Application.Services
{
    public class SpreadsheetService : ISpreadsheetService
    {
        private readonly IAppDbContext _dbContext;
        private readonly IClientService _clientService;
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IOrderProductService _orderProductService;
        private readonly ILastSpreadsheetService _lastSpreadSheetService;
        private readonly IValidator<SpreadsheetRowDto> _rowValidator;
        public SpreadsheetService(IAppDbContext dbContext,
                                  IValidator<SpreadsheetRowDto> rowValidator,
                                  IClientService clientService,
                                  IProductService productService,
                                  IOrderService orderService,
                                  IOrderProductService orderProductService,
                                  ILastSpreadsheetService lastSpreadsheetService) 
        {
            _dbContext = dbContext;
            _rowValidator = rowValidator;
            _clientService = clientService;
            _productService = productService;
            _orderService = orderService;
            _orderProductService = orderProductService;
            _lastSpreadSheetService = lastSpreadsheetService;
        }

        public async Task<SpreadsheetProcessingResult> ProcessSpreadsheetAsync(Stream stream)
        {
            try 
            {
                var rows = stream.Query<SpreadsheetRowDto>().ToList();

                if (!rows.Any())
                    throw new InvalidDataException("A planilha se encontra vazia ou em um formato inválido.");

                rows = rows.Where(r => !IsRowEmpty(r)).ToList();

                var result = await ValidateSpreadsheet(rows);
            
                var validRows = result.ValidRows;

                var cleanedValidRows = ClearDataRows(validRows);

                await _lastSpreadSheetService.RegisterLastSpreadsheet(cleanedValidRows);

                await RegisterData(validRows);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao processar a planilha: " + ex.Message);
            }
        }

        private async Task<SpreadsheetProcessingResult> ValidateSpreadsheet(IEnumerable<SpreadsheetRowDto> rows) 
        {
            SpreadsheetProcessingResult result = new SpreadsheetProcessingResult();

            int rowNumber = 1;

            foreach (var row in rows)
            {
                rowNumber++;
                var validationResult = await _rowValidator.ValidateAsync(row);

                if (!validationResult.IsValid)
                {
                    result.InvalidRows.Add(new SpreadsheetRowErrorDto
                    {
                        RowNumber = rowNumber,
                        Row = row,
                        Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                    });
                }
                else
                {
                    result.ValidRows.Add(row);
                }

            }

            return result;
        }

        private async Task RegisterData(IEnumerable<SpreadsheetRowDto> validRows)
        {
            foreach (var row in validRows)
            {
                var client = await _clientService.RegisterClient(row);
                var product = await _productService.FindProduct(row);
                var order = await _orderService.RegisterOrder(row);

                if (product != null)
                {
                    await _orderProductService.RegisterOrderProduct(order.Id, product.Id);
                }
            }
        }

        private IEnumerable<SpreadsheetRowDto> ClearDataRows(IEnumerable<SpreadsheetRowDto> rows)
        {
            foreach (var row in rows)
            {
                row.Document = Regex.Replace(row.Document, @"[^\d]", "");
                row.CEP = Regex.Replace(row.CEP, @"[^\d]", "");
                row.CorporateReason = row.CorporateReason?.Trim();
                row.ProductName = row.ProductName?.Trim();
            }
            return rows;
        }

        private bool IsRowEmpty(SpreadsheetRowDto row)
        {
            return string.IsNullOrWhiteSpace(row.Document);
        }
    }
}
