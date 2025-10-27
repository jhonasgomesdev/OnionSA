using AutoMapper;
using Server.Domain.Entities;
using Server.Application.DTOs;

namespace Server.Application.Mapping
{
    public class SpreadsheetMappingProfile : Profile
    {
        public SpreadsheetMappingProfile()
        {
            CreateMap<SpreadsheetRowDto, Client>()
                .ForMember(dest => dest.IdentificationDocument, opt => opt.MapFrom(src => src.Document))
                .ForMember(dest => dest.CorporateReason, opt => opt.MapFrom(src => src.CorporateReason))
                .ForMember(dest => dest.CEP, opt => opt.MapFrom(src => src.CEP));

            CreateMap<SpreadsheetRowDto, Order>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.OrderNumber))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => DateOnly.FromDateTime(src.Date)))
                .ForMember(dest => dest.ClientIdentificationDocument, opt => opt.MapFrom(src => src.Document));

            CreateMap<SpreadsheetRowDto, LastSpreadsheet>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => DateOnly.FromDateTime(src.Date)))
                .ReverseMap()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToDateTime(TimeOnly.MinValue)));
        }
    }
}
