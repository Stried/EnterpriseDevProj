using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class EventApplication
    {

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


    }
}
