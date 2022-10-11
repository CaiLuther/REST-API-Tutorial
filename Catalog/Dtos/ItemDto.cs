namespace Catalog.Dtos
{
     public record ItemDto
    {
        public Guid Id { get; init; }
        public bool DidWork { get; init; }
        public string Name { get; init; }
        public string  Effect { get; init; }
        public int Duration { get; init; }
        public string FirstIngredient { get; init; }
        public string SecondIngredient { get; init; }
        public string ThirdIngredient { get; init; }
        public DateTimeOffset CreatedDate { get; init; }
    }
}