﻿using AutoMapper;
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
        public CartController(MyDbContext context, ILogger<EventController> logger,IMapper mapper)
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
        [HttpPost("/AddCartItem"), Authorize]  // who lives in a pineapple under the sea?
        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        public IActionResult AddCartItem(AddCartItemRequest cartItem)
        {
            var now = DateTime.Now;
            var userId = GetUserId;
			var result = _context.Carts.Where(t => t.CartRoute == userId()).Select(t => t.CartId).FirstOrDefault();

			var myCartItem = new CartItem()
            {
                Quantity = cartItem.Quantity,
                CreatedAt = now,
                UpdatedAt = now,
                CartId = result,
                EventId = cartItem.EventId
            };
            var eventPrice = _context.Events.Where(t => t.EventId == cartItem.EventId).Select(t => t.EventPrice).FirstOrDefault();
            myCartItem.SubTotal = myCartItem.Quantity * eventPrice;

            _context.CartItems.Add(myCartItem);
            _context.SaveChanges();

            CartItem? newCartItem = _context.CartItems.Include(t => t.Cart)
                        .FirstOrDefault(t => t.CartId == myCartItem.CartId && t.EventId == myCartItem.EventId);
            CartItemDTO cartItemDTO = _mapper.Map<CartItemDTO>(newCartItem);
            return Ok(cartItemDTO);
        }


        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        [HttpGet("GetCartItem/{id}"), Authorize]
        public IActionResult GetCartItems(int id)
        {
            try {
                int userId = GetUserId();
                if (id == null)
                {
                    return NotFound();
                }
                IQueryable<CartItem> result = _context.CartItems.Include(t => t.Event);
                var listofCarts = result.OrderByDescending(x => x.CreatedAt).ToList();

                //var data = listofCarts.Select(t => new{
                //        t.EventId,
                //        Event = new {
                //            t.Event?.EventPrice,
                //            t.Event?.EventName
                //        }
                //});
                IEnumerable<CartItemDTO> data = result.Select(t => new CartItemDTO
                {
                    CartItemId = t.CartItemId,
                    Quantity = t.Quantity,
                    SubTotal = t.Quantity * t.Event.EventPrice,
                    Cart = _mapper.Map<CartDTO>(t.Cart),
                    Event = _mapper.Map<EventDTO>(t.Event)
                });

                return Ok(data);
            }
            catch(Exception ex)
            {
                logger.LogError(ex, $"Error Reving Ent Application {id}, ERRCODE 1009");
                return StatusCode(500);
            }
        } 

        [ProducesResponseType(typeof(IEnumerable<CartItemDTO>), StatusCodes.Status200OK)]
        [HttpPut("/UpdateCartItem/{id}"), Authorize]
        public IActionResult UpdateCartItem(int id, UpdateCartItemRequest cartItem)
        {
            var myCartItem = _context.CartItems.Find(id);
            if (myCartItem == null)
            {
                return NotFound();
            }
            int userId = GetUserId();
            int cartId = _context.Carts.Where(t => t.UserId == userId).Select(t => t.CartId).FirstOrDefault();
            var eventPrice = _context.Events.Where(t => t.EventId == myCartItem.EventId).Select(t => t.EventPrice).FirstOrDefault();
            if (myCartItem.CartId != userId)
            {
                return Forbid();
            }
            if (myCartItem.Quantity != null)
            {
                myCartItem.Quantity = cartItem.Quantity;
                myCartItem.SubTotal = cartItem.Quantity * eventPrice;
            }
            myCartItem.UpdatedAt = DateTime.Now;

            _context.SaveChanges();
            return Ok();
        }
        [HttpDelete("/DeleteCartItem"), Authorize]
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
                DateOfBirth = cartParticipant.DateOfBirth,
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
            if (cartParticipant.DateOfBirth != null)
            {
                myCartParticipant.DateOfBirth = cartParticipant.DateOfBirth;
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
    }
}
