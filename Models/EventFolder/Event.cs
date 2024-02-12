using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.OrderFolder;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class Event
    {
        public int EventId { get; set; }

        [Required, MinLength(3), MaxLength(60)]
        public string EventName { get; set; } = string.Empty;

        [Required, Range(0, 10000)]
        public int EventPrice { get; set; } 

        [Required, Range(0, 10000)]
        public int FriendPrice { get; set; } 

        [Required, Range(0, 10000)]
        public int NTUCPrice { get; set; }

        [Required, Range(1, 200)]
        public int MaxPax { get; set; }

        [Required]
        public bool Approval { get; set; }

        [Required]
        public string ActivityType { get; set; } = string.Empty;

        [Required, MinLength(5), MaxLength(50)]
        public string EventLocation {  get; set; } = string.Empty;

        [Required]
        public DateOnly ExpiryDate { get; set; }

        [Required, Range(0, 200)]
        public int RemainingPax {  get; set; }

        public float AvgRating { get; set; }

        [Required]
        public string DateType {  get; set; } = string.Empty;

        [Required, MaxLength(3000)]
        public string ContentHTML { get; set; } = string.Empty;

        [Required]
        public int UserID { get; set; } 

        public User? User { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EventCreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EventUpdatedAt { get; set; }
        public List<Date>? Dates {get; set;}
        public CartItem? CartItem { get; set; }
        public OrderItem? OrderItem { get; set; }
    }
}
