﻿using EnterpriseDevProj.Models.EventFolder;

namespace EnterpriseDevProj.Models.OrderFolder
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int Quantity { get; set; }
        public float SubTotal { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }
        public List<OrderParticipant>? Participants { get; set; }
    }
}
