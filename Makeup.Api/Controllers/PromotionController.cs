using Microsoft.AspNetCore.Mvc;
using Makeup.Application.Interfaces;

namespace Makeup.Api.Controllers
{
    public class PromotionController
    {
        [ApiController]
        [Route("api/[controller]")]
        public class PromotionsController : ControllerBase
        {
            private readonly IPromotionService _service;

            public PromotionsController(IPromotionService service)
            {
                _service = service;
            }

            [HttpGet("carousel")]
            public async Task<IActionResult> GetCarousel() =>
                Ok(await _service.GetCarouselAsync());

            [HttpGet]
            public async Task<IActionResult> GetAll() =>
                Ok(await _service.GetAllAsync());
        }

    }
}
