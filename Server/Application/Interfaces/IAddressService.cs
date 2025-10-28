using Server.Domain.DTOs;

namespace Server.Application.Interfaces
{
    public interface IAddressService
    {
        Task<AddressDto?> GetAddress(string cep);
    }
}
