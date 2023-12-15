using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class UpdateUserRoleRequest
    {
        [Required]
        public string UserRole { get; set; } = string.Empty;
    }
}
