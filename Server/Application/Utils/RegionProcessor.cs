using Server.Domain.Entities;

namespace Server.Application.Utils
{
    public class RegionProcessor
    {
        public static decimal GetDeliveryCost(string region, string locality)
        {
            if (locality == "São Paulo" && region == "Sudeste")
            {
                return 0m;
            }

            return region switch
            {
                "Norte" or "Nordeste" => 0.30m,
                "Centro-Oeste" or "Sul" => 0.20m,
                "Sudeste" => 0.10m,
                _ => 0m
            };
        }

        public static int GetDeliveryTime(string region, string locality)
        {
            if (locality == "São Paulo" && region == "Sudeste")
            {
                return 0;
            }

            return region switch
            {
                "Norte" or "Nordeste" => 10,
                "Centro-Oeste" or "Sul" => 5,
                "Sudeste" => 1,
                _ => 0
            };
        }
    }

}
