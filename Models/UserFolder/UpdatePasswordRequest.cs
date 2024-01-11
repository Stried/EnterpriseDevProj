using System.ComponentModel.DataAnnotations;

namespace EnterpriseDevProj.Models.UserFolder
{
    public class UpdatePasswordRequest
    {
        [Required, MinLength(8), MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required, MinLength(8), MaxLength (100)]
        public string ConfirmPassword {  get; set; } = string.Empty;
    }
}
