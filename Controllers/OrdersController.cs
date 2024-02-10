using Microsoft.AspNetCore.Mvc;

namespace EnterpriseDevProj.Controllers
{
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(MyDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }


    }
}
