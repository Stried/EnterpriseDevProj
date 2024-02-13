using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.UserFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class EventDTO
    {
        public int EventId { get; set; }


        public string EventName { get; set; } = string.Empty;


        public float EventPrice { get; set; }


        public float FriendPrice { get; set; }


        public float NTUCPrice { get; set; }


        public int MaxPax { get; set; }


        public bool Approval { get; set; }


        public string ActivityType { get; set; } = string.Empty;


        public string EventLocation { get; set; } = string.Empty;


        public DateOnly ExpiryDate { get; set; }

        public float AvgRating { get; set; }


        public string ContentHTML { get; set; } = string.Empty;


        public int UserID { get; set; }

        public DateTime EventCreatedAt { get; set; }


        public DateTime EventUpdatedAt { get; set; }

        public UserDTO? User { get; set; }
    }
}
