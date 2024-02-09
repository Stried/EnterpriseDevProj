namespace EnterpriseDevProj.Models.FriendsFolder
{
    public class Friend
    {
        public int Id { get; set; }

        public int FromUser { get; set; }

        public string FromUserName { get; set; } = string.Empty;

        public string FromUserImage { get; set; } = string.Empty;

        public int ToUser { get; set; }

        public bool RequestApproved { get; set; }
    }
}
