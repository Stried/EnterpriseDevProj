using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.CartFolder
{
    public class AddCartItemRequest
    {
        [Required]
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public int DateId{get; set;}
        public int EventPrice {get; set;}
        public string EventName {get; set;} = string.Empty;
		public DateTime DateOfEvent { get; set; }
        public int EventId { get; set; }
    }
}
