using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Makeup.Api.Controllers
{
    namespace Makeup.Api.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class CartController : ControllerBase
        {
            private readonly ICartService _cartService;

            public CartController(ICartService cartService)
            {
                _cartService = cartService;
            }

            [HttpPost("add")]
            public async Task<IActionResult> AddToCart([FromBody] CartItemDto item)
            {
                var cart = await _cartService.AddToCartAsync(item);
                return Ok(cart);
            }

            [HttpGet]
            public async Task<IActionResult> GetCart()
            {
                var cart = await _cartService.GetCartAsync();
                return Ok(cart);
            }

            [HttpDelete("{productId}")]
            public async Task<IActionResult> RemoveFromCart(int productId)
            {
                await _cartService.RemoveFromCartAsync(productId);
                return NoContent();
            }
        }
    }
}
