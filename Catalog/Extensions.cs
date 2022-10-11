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
                DidWork = item.DidWork,
                Name = item.Name,
                Effect = item.Effect,
                Duration = item.Duration,
                FirstIngredient = item.FirstIngredient,
                SecondIngredient = item.SecondIngredient,
                ThirdIngredient = item.ThirdIngredient,
                CreatedDate = item.CreatedDate
            };

        }
    }
}