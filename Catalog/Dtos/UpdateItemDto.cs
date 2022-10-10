using System.ComponentModel.DataAnnotations;

namespace Catalog.Dtos
{
    public record UpdateItemDto
    {
        [Required]
        public string Name { get; init; }
        
        [Required]
        public string  Effect { get; init; }
        
        [Required]
        public int Duration { get; init; }
        
        [Required]
        public string FirstIngredient { get; init; }
        
        [Required]
        public string SecondIngredient { get; init; }

        public string ThirdIngredient { get; init; }
    }
}