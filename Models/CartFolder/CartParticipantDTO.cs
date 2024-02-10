namespace EnterpriseDevProj.Models.CartFolder
{
    public class CartParticipantDTO
    {
        public int CartParticipantId { get; set; }
        public string CartParticipantName { get; set; } = string.Empty;
        public int CartParticipantPhone { get; set; }
        public string CartParticipantEmail { get; set; } = string.Empty;
        public int CartItemId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public CartItemDTO? CartItem { get; set; }
    }
}
