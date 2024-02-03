﻿namespace EnterpriseDevProj.Models.UserFolder
{
    public class GoogleSessionResponse
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Picture {  get; set; } = string.Empty;

        public string UserRole { get; set; } = "User";
    }
}
