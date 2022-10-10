namespace Catalog.Entities
{
    public record Item
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string  Effect { get; set; }
        public int Duration { get; set; }
        public string FirstIngredient { get; set; }
        public string SecondIngredient { get; set; }
        public string ThirdIngredient { get; set; }
        public DateTimeOffset CreatedDate { get; init; }
    }
}