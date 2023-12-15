using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class GroupCreateRequest
    {
        [Required, MinLength(3), MaxLength(20)]
        public string GroupName { get; set; } = string.Empty;
    }
}
