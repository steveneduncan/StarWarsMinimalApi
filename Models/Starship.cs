namespace StarWarsMinimalApi.Models
{
    public class Starship
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string Manufacturer { get; set; } = string.Empty;
        public int CostInCredits { get; set; }
        public int Length { get; set; }
        public int MaxAtmospheringSpeed { get; set; }
        public string Crew { get; set; } = string.Empty;
        public int Passengers { get; set; }
        public int CargoCapacity { get; set; }
        public string Consumables { get; set; } = string.Empty;
        public decimal HyperdriveRating { get; set; }
        public int MGLT { get; set; }
        public string StarshipClass { get; set; } = string.Empty;
        public string[] Pilots { get; set; } = System.Array.Empty<string>();
        public string[] Films { get; set; } = System.Array.Empty<string>();
        public DateTime Created { get; set; }
        public DateTime Edited { get; set; }
        public string Url { get; set; } = string.Empty;

    }
}
