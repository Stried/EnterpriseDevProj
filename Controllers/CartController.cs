using AutoMapper;
using EnterpriseDevProj.Models.CartFolder;
using EnterpriseDevProj.Models.EventFolder;
using EnterpriseDevProj.Models.UserFolder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EnterpriseDevProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
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
        public CartController(MyDbContext context, ILogger<EventController> logger, IMapper mapper)
        {
            _context = context;
            this.logger = logger;
            _mapper = mapper;
        }

        // Cart
        [HttpPost("NewCart/{userEmail}")]
        [ProducesResponseType(typeof(IEnumerable<CartDTO>), StatusCodes.Status200OK)]
        public IActionResult AddCart(string userEmail)
        {
            var userAcc = _context.Users.FirstOrDefault(x => x.Email == userEmail);
            if (userAcc == null)
            {
                return StatusCode(500);
            }
            var now = DateTime.Now;
            var result = _context.Carts.FirstOrDefault(c => c.UserId == userAcc.Id);
            if (result == null)
            {
                var myCart = new Cart()
                {
                    CartRoute = userAcc.Id,
                    CreatedAt = now,
                    UpdatedAt = now,
                    UserId = userAcc.Id
                };

                _context.Carts.Add(myCart);
                _context.SaveChanges();

                Cart? newCart = _context.Carts.Include(t => t.User)
                        .FirstOrDefault(t => t.UserId == myCart.UserId);
                CartDTO cartDTO = _mapper.Map<CartDTO>(newCart);
                return Ok(cartDTO);
            }
            else
            {
                return BadRequest("Cart Already Exists");
            }
        }
        //[ProducesResponseType(typeof(IEnumerable<CartDTO>), StatusCodes.Status200OK)]
        //[HttpGet("/GetCart/{id}"), Authorize]
        //public IActionResult GetCart()
        //{
        //    int userId = GetUserId();
        //    IQueryable<Cart> result = _context.Carts.Where(t => t.UserId == userId)
        //                                            .Include(t => t.User)
        //                                            .Include(t => t.CartItems);

        //    IEnumerable<CartDTO> data = result.Select(t => _mapper.Map<CartDTO>(t));
        //    return Ok(data);
        //}

        [HttpGet, Authorize]
        public IActionResult GetCartItem()
        {
            int userID = GetUserID();
            var cartItem = _context.Carts.Where(x => x.UserId == userID).FirstOrDefault();

            return Ok(cartItem);
        }

        [HttpDelete("/DeleteCart"), Authorize]
        public IActionResult DeleteCart(int cartId)
        {
            var myCart = _context.Carts.Find(cartId);
            if (myCart == null)
            {
                return NotFound("Cart does not exist");
            }

            _context.Carts.Remove(myCart);
            _context.SaveChanges();
            return Ok();
        }

        // CartItem
        [HttpPost("AddCartItem"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        public IActionResult AddCartItem(AddCartItemRequest cartItem)
        {
            var now = DateTime.Now;
            var userId = GetUserId();
            var result = _context.Carts.Where(t => t.CartRoute == userId).Select(t => t.CartId).FirstOrDefault();

            var myCartItem = new CartItem()
            {
                Quantity = cartItem.Quantity,
                DateOfEvent = cartItem.DateOfEvent,
                EventPrice = cartItem.EventPrice,
                EventName = cartItem.EventName,
                CreatedAt = now,
                UpdatedAt = now,
                DateId = cartItem.DateId,
                CartId = result,
            };
            var eventPrice = _context.Events.Where(t => t.EventId == cartItem.EventId).Select(t => t.EventPrice).FirstOrDefault();
            myCartItem.SubTotal = myCartItem.Quantity * eventPrice;
            logger.LogInformation("Check One");

            var checkForCartItem = _context.CartItems.Where(x => x.DateId == cartItem.DateId && x.CartId == result).FirstOrDefault();
            if (checkForCartItem != null)
            {
                checkForCartItem.Quantity += 1;
                _context.SaveChanges();

                return Ok();
            }
            logger.LogInformation("Check Two");

            _context.CartItems.Add(myCartItem);
            _context.SaveChanges();

            logger.LogInformation("Check Three");

            CartItem? newCartItem = _context.CartItems.Include(t => t.Cart).Include(e => e.Dates)
                        .FirstOrDefault(t => t.CartId == myCartItem.CartId);
            CartItemDTO cartItemDTO = _mapper.Map<CartItemDTO>(newCartItem);
            logger.LogInformation("Check Four");

            return Ok(cartItemDTO);
        }

        [HttpGet("getMyCartItems"), Authorize]
        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        public IActionResult GetMyCartItems()
        {
            try
            {
                int userId = GetUserId();
                // userID from user cart can be found
                var userCart = _context.Carts.First(x => x.UserId == userId);

                var userCartItems = _context.CartItems.Where(u => u.CartId == userCart.CartId).Include(e => e.Dates);

                List<CartItem> cartItemsList = userCartItems.OrderBy(x => x.CreatedAt).ToList();
                // IEnumerable<CartItem> data = cartItemsList.Select(t => _mapper.Map<CartItem>(t));

                return Ok(cartItemsList);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Cart item retrieval failed");
                return StatusCode(500);
            }
        }

        [HttpPut("updateCartItem/{cartItemId}"), Authorize]
        public IActionResult UpdateCartItem(int cartItemId, UpdateCartItemRequest cartItemQuantity)
        {
            var findCartItem = _context.CartItems.Find(cartItemId);
            if (findCartItem == null)
            {
                logger.LogError("Cart Item is not found");
                return StatusCode(500);
            }

            logger.LogInformation(cartItemQuantity.ToString());
            findCartItem.Quantity = cartItemQuantity.Quantity;

            _context.CartItems.Update(findCartItem);
            _context.SaveChanges();

            return Ok(findCartItem);
        }

        [HttpDelete("deleteCartItem/{cartItemId}"), Authorize]
        public IActionResult DeleteCartItem(int cartItemId)
        {
            var myCartItem = _context.CartItems.Find(cartItemId);
            if (myCartItem == null)
            {
                return NotFound("Cart Item does not exist");
            }

            _context.CartItems.Remove(myCartItem);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("updateCartSubtotal/{subTotal}"), Authorize]
        public IActionResult UpdateCartSubTotal(int subTotal)
        {
            var userID = GetUserID();
            var cartOfUser = _context.Carts.Where(x => x.UserId == userID).FirstOrDefault();
            if (cartOfUser == null)
            {
                logger.LogInformation("User is null here");
                return StatusCode(500);
            }
            cartOfUser.SubTotal = subTotal;
            logger.LogInformation(subTotal.ToString());
           

            _context.Carts.Update(cartOfUser);
            _context.SaveChanges();
            logger.LogInformation(cartOfUser.SubTotal.ToString());

            return Ok();
        }

        [HttpPost("updateCartUsedVoucher/{voucherUsed}"), Authorize]
        public IActionResult UpdateCartVoucherUsedl(int voucherUsed)
        {
            var userID = GetUserID();
            var cartOfUser = _context.Carts.Where(x => x.UserId == userID).FirstOrDefault();
            logger.LogInformation(voucherUsed.ToString());
            cartOfUser.VoucherUsed = voucherUsed;

            _context.Carts.Update(cartOfUser);
            _context.SaveChanges();
            logger.LogInformation(cartOfUser.VoucherUsed.ToString());

            return Ok();
        }

        // Participant
        [ProducesResponseType(typeof(IEnumerable<CartParticipantDTO>), StatusCodes.Status200OK)]
        [HttpPost("/AddCartParticipant"), Authorize]
        public IActionResult AddCartParticipant(AddCartParticipantRequest cartParticipant)
        {
            var now = DateTime.Now;
            var myCartParticipant = new CartParticipant()
            {
                CartParticipantName = cartParticipant.CartParticipantName.Trim(),
                CartParticipantPhone = cartParticipant.CartParticipantPhone,
                CartParticipantEmail = cartParticipant.CartParticipantEmail.Trim(),
                CartItemId = cartParticipant.CartItemId,
                CreatedAt = now,
                UpdatedAt = now
            };

            _context.CartParticipants.Add(myCartParticipant);
            _context.SaveChanges();

            CartParticipant? newCartParticipant = _context.CartParticipants.Include(t => t.CartItem)
                        .FirstOrDefault(t => t.CartItemId == myCartParticipant.CartItemId);
            CartParticipantDTO cartParticipantDTO = _mapper.Map<CartParticipantDTO>(newCartParticipant);
            return Ok(cartParticipantDTO);
        }

        [ProducesResponseType(typeof(IEnumerable<CartParticipantDTO>), StatusCodes.Status200OK)]
        [HttpGet("/GetCartParticipant"), Authorize]
        public IActionResult GetCartParticipants(int cartItemId)
        {
            IQueryable<CartParticipant> result = _context.CartParticipants.Where(t => t.CartItemId == cartItemId).Include(t => t.CartItem);
            IEnumerable<CartParticipantDTO> data = result.Select(t => new CartParticipantDTO
            {
                CartItem = _mapper.Map<CartItemDTO>(t)
            });
            return Ok(data);
        }

        [ProducesResponseType(typeof(IEnumerable<CartParticipantDTO>), StatusCodes.Status200OK)]
        [HttpPut("/UpdateCartParticipant"), Authorize]
        public IActionResult UpdateCartParticipant(int cartParticipantId, UpdateCartParticipantRequest cartParticipant)
        {
            var myCartParticipant = _context.CartParticipants.Find(cartParticipantId);
            if (myCartParticipant == null)
            {
                return NotFound();
            }
            int userId = GetUserId();
            int cartId = _context.Carts.Where(t => t.UserId == userId).Select(t => t.CartId).FirstOrDefault();
            int cartItemId = _context.CartItems.Where(t => t.CartId == cartId).Select(t => t.CartItemId).FirstOrDefault();
            if (myCartParticipant.CartItemId != cartItemId)
            {
                return Forbid();
            }
            if (cartParticipant.CartParticipantName != null)
            {
                myCartParticipant.CartParticipantName = cartParticipant.CartParticipantName.Trim();
            }
            if (cartParticipant.CartParticipantPhone != null)
            {
                myCartParticipant.CartParticipantPhone = cartParticipant.CartParticipantPhone;
            }
            if (cartParticipant.CartParticipantEmail != null)
            {
                myCartParticipant.CartParticipantEmail = cartParticipant.CartParticipantEmail.Trim();
            }
            myCartParticipant.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("/DeleteCartParticipant"), Authorize]
        public IActionResult DeleteCartParticipant(int cartParticiapntId)
        {
            var myCartParticipant = _context.CartParticipants.Find(cartParticiapntId);
            if (myCartParticipant == null)
            {
                return NotFound("Cart Item does not exist");
            }

            _context.CartParticipants.Remove(myCartParticipant);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("/addParticipantGroup/{groupId}"), Authorize]
        public IActionResult addParticipantGroup(int groupId)
        {
            var groupID = groupId;
            var participantsInGroup = _context.UserGroupLinks.Where(x => x.GroupID == groupID).ToList();

            for (int i = 0; i < participantsInGroup.Count; i++)
            {
                var user = _context.Users.Find(participantsInGroup[i].UserID);
                if (user != null)
                {
                    logger.LogError("Error in retrieving user for group participants");
                    return StatusCode(500);
                }

                var now = DateTime.Now;
                CartParticipant cartParticipant = new()
                {
                    CartParticipantName = user.Name,
                    CartParticipantEmail = user.Email,
                    CartParticipantPhone = user.PhoneNumber,
                    CreatedAt = now,
                    UpdatedAt = now,
                };

                _context.CartParticipants.Add(cartParticipant);
                _context.SaveChanges();
            }

            return Ok();
        }

        public int GetUserID()
        {
            try
            {
                return Convert.ToInt32(User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).SingleOrDefault());
            }
            catch (Exception ex)
            {
                return 401;
            }
        }
    }
}
