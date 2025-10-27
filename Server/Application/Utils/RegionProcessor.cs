using Server.Domain.Entities;

namespace Server.Application.Utils
{
    public class RegionProcessor
    {
        public static string GetRegionByState(Address address)
        {
            return address.UF.ToUpper() switch
            {
                "AC" or "AP" or "AM" or "PA" or "RO" or "RR" or "TO" => "Norte",
                "AL" or "BA" or "CE" or "MA" or "PB" or "PE" or "PI" or "RN" or "SE" => "Nordeste",
                "DF" or "GO" or "MT" or "MS" => "Centro-Oeste",
                "ES" or "MG" or "RJ" or "SP" => "Sudeste",
                "PR" or "RS" or "SC" => "Sul",
                _ => throw new ArgumentException("Estado inválido.")
            };
        }
    }
}
