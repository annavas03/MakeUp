using Makeup.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Makeup.Application.Interfaces;

namespace Makeup.Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<OrderDto>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Items)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    UserName = o.User.Username,
                    OrderDate = o.OrderDate,
                    TotalPrice = o.TotalPrice,
                    Status = o.Status,
                    Items = o.Items.Select(i => new OrderItemDto
                    {
                        Id = i.Id,
                        OrderId = i.OrderId,
                        ProductId = i.ProductId,
                        Quantity = i.Quantity,
                        Price = i.Price
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<OrderDto?> GetByIdAsync(int id)
        {
            var o = await _context.Orders
                .Include(x => x.User)
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (o == null) return null;

            return new OrderDto
            {
                Id = o.Id,
                UserId = o.UserId,
                UserName = o.User.Username,
                OrderDate = o.OrderDate,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    Id = i.Id,
                    OrderId = i.OrderId,
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            };
        }

        public async Task<OrderDto> CreateAsync(OrderDto dto)
        {
            var order = new Order
            {
                UserId = dto.UserId,
                Status = dto.Status,
                OrderDate = dto.OrderDate
            };

            foreach (var item in dto.Items)
            {
                order.Items.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            dto.Id = order.Id;
            return dto;
        }

        public async Task UpdateStatusAsync(int id, Status status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) throw new KeyNotFoundException();
            order.Status = status;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) throw new KeyNotFoundException();
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }

}
