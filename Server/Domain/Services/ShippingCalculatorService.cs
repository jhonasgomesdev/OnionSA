namespace Server.Domain.Services
{
    public class ShippingCalculatorService
    {
        public static decimal CalculateFreight(decimal productValue, string uf, string city)
        {
            if (uf == "SP" && city.Equals("São Paulo", StringComparison.OrdinalIgnoreCase))
            {
                return 0; // Gratuito
            }

            return uf switch
            {
                // Norte/Nordeste
                "AM" or "RR" or "AP" or "PA" or "TO" or "RO" or "AC" or //Norte
                "MA" or "PI" or "CE" or "RN" or "PB" or "PE" or "AL" or "SE" or "BA" //Nordeste
                    => productValue * 0.30m,

                // Centro-Oeste/Sul
                "MS" or "MT" or "GO" or "DF" or //Centro-Oeste
                "PR" or "SC" or "RS" //Sul
                    => productValue * 0.20m,

                // Sudeste (exceto SP Capital)
                "SP" or "RJ" or "ES" or "MG"
                    => productValue * 0.10m,

                _ => productValue * 0.10m // Regra padrão? Definir com o P.O.
            };
        }

        public static DateOnly CalculateDeliveryDate(DateOnly orderDate, string uf, string city)
        {
            if (uf == "SP" && city.Equals("São Paulo", StringComparison.OrdinalIgnoreCase))
            {
                return orderDate; // Mesmo dia
            }

            // TODO: Implementar lógica de dias úteis/corridos
            // ...
            return orderDate.AddDays(1); // Placeholder
        }
    }
}
