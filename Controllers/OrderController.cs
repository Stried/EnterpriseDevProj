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
        [HttpPost("NewOrder"), Authorize]
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

        [HttpGet("GetMyOrders"), Authorize]
        public IActionResult GetMyOrders()
        {
            var user = GetUserId();
            IQueryable result = _context.Orders.Where(t => t.UserId == user).OrderByDescending(t => t.CreatedAt).Include(t => t.OrderItems);

            return Ok(result);
        }


        [HttpGet("GetMyCurrentOrder"), Authorize]
        public IActionResult GetMyCurrentOrder()
        {
            var user = GetUserId();
            var result = _context.Orders.Where(t => t.UserId == user).Include(t => t.OrderItems).OrderByDescending(t => t.OrderId).FirstOrDefault();

            return Ok(result);
        }

        [HttpGet("GetMySpecificOrder/{id}"), Authorize]
        public IActionResult GetMySpecificOrder(int id)
        {
            var result = _context.Orders.Where(t => t.OrderId == id).Include(t => t.User).FirstOrDefault();
            return Ok(result);
        }

        // OrderItem
        [HttpPost("CreateOrderItem"), Authorize]
        public IActionResult CreateOrderItem(AddOrderItemRequest orderItem)
        {
            try
            {
                logger.LogInformation("Check 1");
                var user = GetUserId;
                var now = DateTime.Now;


                var result = _context.Orders.OrderByDescending(t => t.OrderId).Select(t => t.OrderId).FirstOrDefault();
                logger.LogInformation(result.ToString());

                var myOrderItem = new OrderItem()
                {
                    Quantity = orderItem.Quantity,
                    // Error was in front-end, where it was passing in undefined instead of a value.
                    EventId = orderItem.EventId,
                    // You forgot completely about subtotal, it was returning 0
                    SubTotal = orderItem.SubTotal,
                    CreatedAt = now,
                    UpdatedAt = now,
                    OrderId = result,
                };
                logger.LogInformation("Check 2");

                _context.OrderItems.Add(myOrderItem);
                _context.SaveChanges();

                logger.LogInformation("Check 3");
                // Also, why are you mapping the item here in a post function where there is no need to return the item?
                // The new Err500 states that Include operation here is wrong and that is because you cannot include an "OrderId"
                // That is because it is an Id and not an object in the db.
                // OrderItem? newOrderItem = _context.OrderItems.Include(t => t.OrderId)
                   // .Include(e => e.Event).FirstOrDefault(t => t.OrderId == myOrderItem.OrderId && t.EventId == myOrderItem.EventId);
                // var OrderItem = _mapper.Map<OrderItem>(myOrderItem);

                logger.LogInformation("Check 4");
                // return Ok(OrderItem);
                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to create order item. Please troubleshoot the abovementioned error(s) and try again.");
                return StatusCode(500);
            }
        }

        [HttpGet("GetOrderItem/{id}"), Authorize]
        public IActionResult GetOrderItem(int id)
        {
            // Get the user ID from the JWT token
            var userId = GetUserId();

            // Check if the user is authorized to access the order items
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == id && o.UserId == userId);
            if (order == null)
            {
                // If the order does not belong to the user, return 403 Forbidden
                return StatusCode(403, "You are not authorized to access this order item.");
            }
            var usersOrderItems = _context.OrderItems.Where(t => t.OrderId == id);
            List<OrderItem> orderItems = usersOrderItems.Include(t => t.Event).OrderByDescending(x => x.CreatedAt).ToList();
            return Ok(orderItems);  
        }
    }
}
