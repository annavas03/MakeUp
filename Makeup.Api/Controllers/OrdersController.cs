using Makeup.Application.Interfaces;
using Makeup.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Makeup.Application.DTOs;

namespace Makeup.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateOrder(int userId, [FromBody] List<OrderItemDto> items)
        {

            var order = await _orderService.CreateOrderAsync(userId, items);

            return Ok(order);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            var orders = await _orderService.GetUserOrdersAsync(userId);

            return Ok(orders);
        }
    }
}