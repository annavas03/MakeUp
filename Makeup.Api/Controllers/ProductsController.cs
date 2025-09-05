using Makeup.Application.Interfaces;
using Makeup.Domain.Entities;
using Makeup.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Makeup.Application.DTOs.Product;

namespace Makeup.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductListDTO>>> GetProducts(int? brandId = null)
        {
            var products = await _productService.GetAllAsync();
            var dtos = _mapper.Map<IEnumerable<ProductListDTO>>(products);
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailsDTO>> GetProduct(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            var dto = _mapper.Map<ProductDetailsDTO>(product);
            return Ok(dto);
        }
    }
}