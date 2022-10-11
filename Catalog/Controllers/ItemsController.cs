using System;
using Catalog.Entities;
using Catalog.Repositories;
using Catalog.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Controllers
{


    [ApiController]
    [Route("items")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository repository; 

        public ItemsController(IItemsRepository repository)
        {
            this.repository = repository;
        }

        // GET /items
        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetItemsAsync()
        {
            var items = (await repository.GetItemsAsync())
                        .Select(item => item.AsDto());
            return items;
        }


        //Get /item/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItemAsync(Guid id)
        {
            var item = await repository.GetItemAsync(id);

            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }

        // POST /items
        [HttpPost]
        public async Task<ActionResult<ItemDto>> CreateItemAsync(CreateItemDto itemDto)
        {
            Item item = new(){
                Id = Guid.NewGuid(),
                DidWork = false,
                Name = itemDto.Name,
                Effect = itemDto.Effect,
                Duration = itemDto.Duration,
                FirstIngredient = itemDto.FirstIngredient,
                SecondIngredient = itemDto.SecondIngredient,
                ThirdIngredient = itemDto.ThirdIngredient,
                CreatedDate = DateTimeOffset.Now
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new {id = item.Id}, item.AsDto());
        }

        // PUT /items/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(Guid id, UpdateItemDto itemDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            Item updatedItem = existingItem with
            {
                DidWork = itemDto.DidWork,
                Name = itemDto.Name,
                Effect = itemDto.Effect,
                Duration = itemDto.Duration,
                FirstIngredient = itemDto.FirstIngredient,
                SecondIngredient = itemDto.SecondIngredient,
                ThirdIngredient = itemDto.ThirdIngredient,
            };

            await repository.UpdateItemAsync(updatedItem);

            return NoContent();
        }

        //DELETE /items/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemAsync(Guid id)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            await repository.DeleteItemAsync(id);

            return NoContent();
        }

    }
}