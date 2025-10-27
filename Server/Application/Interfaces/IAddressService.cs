using Server.Domain.Entities;

namespace Server.Application.Interfaces
{
    public interface IAddressService
    {
        Task<Address> GetAddress(string cep);
    }
}
