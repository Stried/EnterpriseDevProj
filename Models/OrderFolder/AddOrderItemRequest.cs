namespace EnterpriseDevProj.Models.OrderFolder
{
    public class AddOrderItemRequest
    {
        public int Quantity { get; set; }
        public float SubTotal { get; set; }
        public int EventId { get; set; }
        public int DateId{get; set;}
        public int EventPrice {get; set;}
        public string EventName {get; set;} = string.Empty;
		public DateTime DateOfEvent { get; set; }

    }
}
