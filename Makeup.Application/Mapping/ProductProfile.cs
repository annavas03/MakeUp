using AutoMapper;
using Makeup.Domain.Entities;
using Makeup.Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Makeup.Application.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            // Product - ProductDetailsDTO
            CreateMap<Product, ProductDetailsDTO>()
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Brand.Name))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Reviews, opt => opt.MapFrom(src => src.Reviews));

            // Review - ReviewDTO
            CreateMap<Review, ReviewDTO>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username));

            // DTO - Entity (наприклад для створення продукту)
            CreateMap<ProductCreateDto, Product>();
        }
    }
}
