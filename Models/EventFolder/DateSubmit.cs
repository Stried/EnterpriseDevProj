using EnterpriseDevProj.Models.CartFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class DateSubmit
    {
        public int DateId { get; set; }

        [Required, MinLength(3), MaxLength(60)]
        public string EventName { get; set; } = string.Empty;

        [Required]
		[Column(TypeName = "datetime")]
		public DateTime DateOfEvent { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime DateCreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime DateUpdatedAt { get; set; }
        [Required]
        public int EventId { get; set; }
        public Event? Event { get; set; }
        public CartItem? CartItem { get; set; }
    }
}
