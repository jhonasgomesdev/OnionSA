using FluentValidation;
using Server.Application.DTOs;
using System.Text.RegularExpressions;

namespace Server.Application.Validators
{
    public class SpreadsheetRowDtoValidator : AbstractValidator<SpreadsheetRowDto>
    {
        private static readonly List<string> _validProducts = new()
        {
            "celular",
            "notebook",
            "televisão"
        };

        public SpreadsheetRowDtoValidator()
        {
            RuleFor(x => x.Document)
                .NotEmpty().WithMessage("Documento é obrigatório.")
                .Must(BeAValidDocument).WithMessage("O documento precisa ter 11 ou 14 digitos.");
            
            RuleFor(x => x.CorporateReason)
                .NotEmpty().WithMessage("Razão social é obrigatório.");
            
            RuleFor(x => x.CEP)
                .NotEmpty().WithMessage("CEP é obrigatório.")
                .Must(BeAValidCEP)
                .WithMessage("CEP precisa conter 8 digitos.");
            
            RuleFor(x => x.ProductName)
                .NotEmpty().WithMessage("Nome do produto é obrigatório.")
                .Must(BeAValidProduct)
                .WithMessage($"O nome do produto precisa ser um dos seguintes: {string.Join(", ", _validProducts)}.");
            
            RuleFor(x => x.OrderNumber)
                .GreaterThan(0).WithMessage("O número do pedido precisa ser maior que 0.");

            RuleFor(x => x.Date)
                .LessThanOrEqualTo(DateTime.UtcNow)
                .WithMessage("A data do pedido deve ser igual ou inferior a data atual.");
        }

        private bool BeAValidDocument(string document)
        {
            if (string.IsNullOrEmpty(document))
                return false;

            var digitsOnly = Regex.Replace(document, @"\D", "");
            return digitsOnly.Length == 11 || digitsOnly.Length == 14;
        }

        private bool BeAValidProduct(string productName)
        {
            if(string.IsNullOrEmpty(productName))
                return false;

            return _validProducts.Contains(productName.ToLowerInvariant());
        }

        private bool BeAValidCEP(string cep) 
        {
            if (string.IsNullOrEmpty(cep))
                return false;

            var digitsOnly = Regex.Replace(cep, @"\D", "");
            return digitsOnly.Length == 8;
        }
    }
}
