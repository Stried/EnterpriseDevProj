using EnterpriseDevProj.Models.EventFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EnterpriseDevProj.Models.CartFolder;

namespace EnterpriseDevProj.Models.EventFolder
{
	public class Date
	{
		public int DateId { get; set; }

		[Required, MinLength(3), MaxLength(60)]
		public string EventName { get; set; } = string.Empty;

		[Required]
		public DateOnly DateOfEvent { get; set; }

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
