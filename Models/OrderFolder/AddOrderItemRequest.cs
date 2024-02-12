namespace EnterpriseDevProj.Models.OrderFolder
{
    public class AddOrderItemRequest
    {
        public int Quantity { get; set; }
        public float SubTotal { get; set; }
        public int EventId { get; set; }
    }
}
