namespace Server.Domain.Entities
{
    public class Client
    {
        public string IdentificationDocument { get; set; }
        public string CorporateReason { get; set; }
        public string CEP { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
