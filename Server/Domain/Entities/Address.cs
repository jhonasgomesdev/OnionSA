using System.Text.Json.Serialization;

namespace Server.Domain.Entities
{
    public class Address
    {
        [JsonPropertyName("uf")]
        public string UF { get; set; }

        [JsonPropertyName("localidade")]
        public string Locality { get; set; }
    }
}
