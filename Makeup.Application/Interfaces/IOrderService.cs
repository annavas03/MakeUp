using Makeup.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makeup.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int userId, List<OrderItemDto> items); // створення замовлення з кошика
        Task<List<OrderDto>> GetUserOrdersAsync(int userId);                   // замовлення конкретного користувача
        Task<OrderDto?> GetByIdAsync(int id);                                  // деталі замовлення
        Task UpdateStatusAsync(int id, Status status);                         // змінити статус (для адміна)
        Task DeleteAsync(int id);                                              // видалити замовлення (для адміна)
    }
}
