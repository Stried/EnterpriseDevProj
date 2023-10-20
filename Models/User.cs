﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnterpriseDevProj.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required, StringLength(9, MinimumLength = 9)]
        public string NRIC { get; set; } = string.Empty;

        [Required, MinLength(3), MaxLength(100), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, Range(80000000, 99999999)]
        public int PhoneNumber { get; set; }

        [Required, MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        public string UserRole { get; set; } = "User";

        [Column(TypeName = "datetime")]
        public DateTime CreatedAt { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set;}


    }
}
