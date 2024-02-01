
	using System.ComponentModel.DataAnnotations.Schema;
	using System.ComponentModel.DataAnnotations;
	using EnterpriseDevProj.Models.CartFolder;

	namespace EnterpriseDevProj.Models.EventFolder
	{
		public class Image
		{
			public int ImageId { get; set; }

			[Required]
			public string ImageUrl { get; set; } = string.Empty;

			[Column(TypeName = "datetime")]
			public DateTime ImageCreatedAt { get; set; }

			[Column(TypeName = "datetime")]
			public DateTime ImageUpdatedAt { get; set; }
			[Required]
			public int EventId { get; set; }
			public Event? Event { get; set; }
			public CartItem? CartItem { get; set; }
		}
	}