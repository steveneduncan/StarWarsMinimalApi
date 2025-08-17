using StarWarsMinimalApi.Models;

namespace StarWarsMinimalApi.Mappings
{
    public static class StarshipMappingExtensions
    {
        public static Starship ToStarship(this StarshipDto dto)
        {
            return new Starship
            {
                Name = dto.Name,
                Model = dto.Model,
                Manufacturer = dto.Manufacturer,
                CostInCredits = int.TryParse(dto.CostInCredits?.Replace(",", ""), out var cost) ? cost : 0,
                Length = int.TryParse(dto.Length?.Replace(",", ""), out var length) ? length : 0,
                MaxAtmospheringSpeed = int.TryParse(dto.MaxAtmospheringSpeed?.Replace(",", ""), out var speed) ? speed : 0,
                Crew = dto.Crew,
                Passengers = int.TryParse(dto.Passengers?.Replace(",", ""), out var passengers) ? passengers : 0,
                CargoCapacity = int.TryParse(dto.CargoCapacity?.Replace(",", ""), out var cargo) ? cargo : 0,
                Consumables = dto.Consumables,
                HyperdriveRating = decimal.TryParse(dto.HyperdriveRating, out var rating) ? rating : 0,
                MGLT = int.TryParse(dto.MGLT?.Replace(",", ""), out var mglt) ? mglt : 0,
                StarshipClass = dto.StarshipClass,
                Pilots = dto.Pilots ?? Array.Empty<string>(),
                Films = dto.Films ?? Array.Empty<string>(),
                Created = dto.Created,
                Edited = dto.Edited,
                Url = dto.Url
            };
        }
    }
}
