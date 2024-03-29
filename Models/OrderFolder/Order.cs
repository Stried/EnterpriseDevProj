﻿using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.OrderFolder
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
