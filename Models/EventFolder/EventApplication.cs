using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class EventApplication
    {
        [Required, MinLength(3), MaxLength(60)]
        public string EventName { get; set; } = string.Empty;

        [Required, Range(0, 10000)]
        public float EventPrice { get; set; }

        [Required, Range(0, 10000)]
        public float FriendPrice { get; set; }

        [Required, Range(0, 10000)]
        public float NTUCPrice { get; set; }

        [Required, Range(1, 200)]
        public int MaxPax { get; set; }

        [Required]
        public bool Approval { get; set; }

        [Required]
        public string ActivityType { get; set; } = string.Empty;

        [Required, MinLength(5), MaxLength(50)]
        public string EventLocation { get; set; } = string.Empty;

        [Required]
        public DateOnly ExpiryDate { get; set; }

        public float AvgRating { get; set; }

        [Required, MaxLength(3000)]
        public string ContentHTML { get; set; } = string.Empty;

        [Required(ErrorMessage = "EventDates is required")]
        public List<DateTime> EventDates { get; set; } = new List<DateTime>();

    }
}
