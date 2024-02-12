using AutoMapper;
using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.OrderFolder;
using EnterpriseDevProj.Models.UserFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogger<EventController> logger;
        private readonly IMapper _mapper;
        private int GetUserId()
        {
            return Convert.ToInt32(User.Claims
                            .Where(c => c.Type == ClaimTypes.NameIdentifier)
                            .Select(c => c.Value).SingleOrDefault());
        }
        public OrderController(MyDbContext context, ILogger<EventController> logger, IMapper mapper)
        {
            _context = context;
            this.logger = logger;
            _mapper = mapper;
        }

        // Order
        [HttpPost("NewOrder")]
        public IActionResult NewOrder()
        {
            var user = GetUserId();
            // var userAcc = _context.Users.FirstOrDefault(x => x.Email == userEmail);
            // if (userAcc == null)
            // {
            //     return StatusCode(500);
            // }
            var now = DateTime.Now;
            var myOrder = new Order()
            {
                CreatedAt = now,
                UpdatedAt = now,
                UserId = user
            };

            _context.Orders.Add(myOrder);
            _context.SaveChanges();

            Order? newOrder = _context.Orders.Include(t => t.User)
                .FirstOrDefault(t => t.UserId == myOrder.UserId);
            return Ok(newOrder);
        }


        // OrderItem
        [HttpPost("CreateOrderItem")]
        public IActionResult CreateOrderItem(AddOrderItemRequest orderItem)
        {
            try
            {
                logger.LogInformation("Check 1");
                var user = GetUserId;
                var now = DateTime.Now;
                var result = _context.Orders.OrderBy(t => t.CreatedAt).Select(t => t.OrderId).FirstOrDefault();
                var myOrderItem = new OrderItem()
                {
                    Quantity = orderItem.Quantity,
                    EventId = orderItem.EventId,
                    CreatedAt = now,
                    UpdatedAt = now,
                    OrderId = result,
                };
                logger.LogInformation("Check 2");

                _context.OrderItems.Add(myOrderItem);
                _context.SaveChanges();

                logger.LogInformation("Check 3");
                OrderItem? newOrderItem = _context.OrderItems.Include(t => t.OrderId)
                    .Include(e => e.Event).FirstOrDefault(t => t.OrderId == myOrderItem.OrderId && t.EventId == myOrderItem.EventId);
                var OrderItem = _mapper.Map<OrderItem>(myOrderItem);

                logger.LogInformation("Check 4");
                return Ok(OrderItem);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to create order item. Please troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }
    }
}
