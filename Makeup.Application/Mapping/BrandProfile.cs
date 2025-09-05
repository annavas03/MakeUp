using AutoMapper;
using Makeup.Application.DTOs.Brand;
using Makeup.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makeup.Application.Mapping
{
    public class BrandProfile : Profile
    {
        public BrandProfile()
        {
            //  Brand - BrandDto
            CreateMap<Brand, BrandDto>().ReverseMap();

            // Brand - BrandDetailsDTO 
            CreateMap<Brand, BrandDetailsDTO>()
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products));
        }
    }

}
