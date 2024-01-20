using EnterpriseDevProj.Models.CartFolder;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EnterpriseDevProj.Models.UserFolder;

namespace EnterpriseDevProj.Models.EventFolder
{
    public class DateDTO
    {
        public int DateId { get; set; }
        public string EventName { get; set; } = string.Empty;
        public DateOnly DateOfEvent { get; set; }
        public DateTime DateCreatedAt { get; set; }
        public DateTime DateUpdatedAt { get; set; }
        public int EventId { get; set; }
        public EventDTO? Event {  get; set; }
    }
}
