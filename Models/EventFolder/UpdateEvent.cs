using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class UpdateEvent
    {
        [Required, MinLength(3), MaxLength(60)]
        public string EventName { get; set; } = string.Empty;

        [Range(0, 10000)]
        public float EventPrice { get; set; }

        [Range(0, 10000)]
        public float FriendPrice { get; set; }

        [Range(0, 10000)]
        public float NTUCPrice { get; set; }

        [Range(1, 200)]
        public int MaxPax { get; set; }

        public bool Approval { get; set; }

        public string ActivityType { get; set; } = string.Empty;

        [MinLength(5), MaxLength(50)]
        public string EventLocation { get; set; } = string.Empty;

        public DateOnly ExpiryDate { get; set; }

        [Range(0, 200)]
        public int RemainingPax { get; set; }

        public string DateType { get; set; } = string.Empty;

        [MaxLength(60000)]
        public string ContentHTML { get; set; } = string.Empty;
        public List<DateTime> EventDates { get; set; } = new List<DateTime>();


    }
}
