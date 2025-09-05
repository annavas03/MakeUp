using AutoMapper;
using Makeup.Application.DTOs.Brand;
using Microsoft.AspNetCore.Mvc;
using Makeup.Application.Interfaces;

namespace Makeup.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IMapper _mapper;

        public BrandsController(IBrandService brandService, IMapper mapper)
        {
            _brandService = brandService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetBrands()
        {
            var brands = await _brandService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<BrandDto>>(brands));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDetailsDTO>> GetBrand(int id)
        {
            var brand = await _brandService.GetByIdAsync(id);
            if (brand == null) return NotFound();

            return Ok(_mapper.Map<BrandDetailsDTO>(brand));
        }
    }

}
