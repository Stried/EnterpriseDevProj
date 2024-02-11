using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace EnterpriseDevProj.Models.TicketFolder
{
    public class UpdateTicketDetails
    {
        public string TicketHeader { get; set; } = string.Empty;
        [Required, MinLength(5), MaxLength(500)]
        public string TicketBody { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string SenderEmail { get; set; } = string.Empty;
        [Required, MaxLength(30)]
        public string AttachedFilename { get; set; } = string.Empty; 
        
    }
}