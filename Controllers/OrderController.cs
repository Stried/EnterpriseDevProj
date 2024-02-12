using AutoMapper;
using EnterpriseDevProj.Models.OrderFolder;
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
        public IActionResult NewOrder(AddOrderRequest order)
        {
            // var user = GetUserId();
            // var userAcc = _context.Users.FirstOrDefault(x => x.Email == userEmail);
            // if (userAcc == null)
            // {
            //     return StatusCode(500);
            // }
            var now = DateTime.Now;
            var myOrder = new Order()
            {
                CustomerName = order.CustomerName,
                CustomerEmail = order.CustomerEmail,
                CustomerPhone = order.CustomerPhone,
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
    }
}
