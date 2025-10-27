namespace Server.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public string ClientIdentificationDocument { get; set; }
        public Client Client { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
