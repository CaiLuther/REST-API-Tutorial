using System;
using Catalog.Entities;
using Catalog.Repositories;
using Catalog.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    public static class Extension
    {
        public static ItemDto AsDto(this Item item)
        {
            return new ItemDto {
                Id = item.Id,
                Name = item.Name,
                Price = item.Price,
                CreatedDate = item.CreatedDate
            };

        }
    }
}