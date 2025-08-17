public class UpdateStarshipDto
{
    public string? Name { get; set; }
    public string? Model { get; set; }
    public string? Manufacturer { get; set; }
    public decimal? CostInCredits { get; set; }
    public decimal? Length { get; set; }
    public int? MaxAtmospheringSpeed { get; set; }
    public string? Crew { get; set; }
    public int? Passengers { get; set; }
    public decimal? CargoCapacity { get; set; }
    public string? Consumables { get; set; }
    public decimal? HyperdriveRating { get; set; }
    public int? MGLT { get; set; }
    public string? StarshipClass { get; set; }
    public string[]? Pilots { get; set; }
    public string[]? Films { get; set; }
    public DateTime? Created { get; set; }
    public DateTime? Edited { get; set; }
    public string? Url { get; set; }
}