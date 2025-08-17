using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;
using StarWarsMinimalApi.Data;
using StarWarsMinimalApi.Mappings;
using StarWarsMinimalApi.Models;


var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

var environment = builder.Environment.EnvironmentName;
string? connectionString = null;

if (environment == "Production")
{
    // Try to get the connection string from the environment variable
    connectionString = Environment.GetEnvironmentVariable("DB_DEFAULT_CONNECTION");
}

if (string.IsNullOrEmpty(connectionString))
{
    // Fallback to appsettings (for Development or if env var is not set)
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string is not configured.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddHttpClient();

// add swagger endpoints
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        // Try to open a connection to the database
        await dbContext.Database.OpenConnectionAsync();
        logger.LogInformation("Database connection successful.");
        await dbContext.Database.CloseConnectionAsync();
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Database connection failed.");
    }
}

// Get all starships
app.MapGet("/api/starships", async (AppDbContext db, ILogger<Program> logger) =>
{
    try
    {
        var starships = await db.Starships.ToListAsync();
        return Results.Ok(starships);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error occurred while retrieving starships.");
        return Results.Problem("An error occurred while retrieving starships.");
    }
});

// Get starships by Id
app.MapGet("api/starships/{id:int}", async (int id, AppDbContext db) =>
{
    var starship = await db.Starships.FirstOrDefaultAsync(s => s.Id == id);
    return starship is not null ? Results.Ok(starship) : Results.NotFound();
});

// Populate the database with starships from the SWAPI API
app.MapPost("/api/starships/seed", async (AppDbContext db, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();
    var starshipdtos = await client.GetFromJsonAsync<List<StarshipDto>>("https://swapi.info/api/starships");
    var starships = starshipdtos?.Select(dto => dto.ToStarship()).ToList();

    if (starships != null && starships.Any())
    {
        db.Starships.AddRange(starships);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
    return Results.BadRequest("No starships found to seed.");
});

// Update starship info
app.MapPatch("/api/starships/{id:int}", async (int id, UpdateStarshipDto updateDto, AppDbContext db) =>
{
    var starship = await db.Starships.FirstOrDefaultAsync(s => s.Id == id);
    if (starship is null)
        return Results.NotFound();

    if (updateDto.Name is not null)
        starship.Name = updateDto.Name;
    if (updateDto.Model is not null)
        starship.Model = updateDto.Model;
    if (updateDto.Manufacturer is not null)
        starship.Manufacturer = updateDto.Manufacturer;
    if (updateDto.CostInCredits.HasValue)
        starship.CostInCredits = (int)updateDto.CostInCredits.Value;
    if (updateDto.Length.HasValue)
        starship.Length = (int)updateDto.Length.Value;
    if (updateDto.MaxAtmospheringSpeed.HasValue)
        starship.MaxAtmospheringSpeed = updateDto.MaxAtmospheringSpeed.Value;
    if (updateDto.Crew is not null)
        starship.Crew = updateDto.Crew;
    if (updateDto.Passengers.HasValue)
        starship.Passengers = updateDto.Passengers.Value;
    if (updateDto.CargoCapacity.HasValue)
        starship.CargoCapacity = (int)updateDto.CargoCapacity.Value;
    if (updateDto.Consumables is not null)
        starship.Consumables = updateDto.Consumables;
    if (updateDto.HyperdriveRating.HasValue)
        starship.HyperdriveRating = updateDto.HyperdriveRating.Value;
    if (updateDto.MGLT.HasValue)
        starship.MGLT = updateDto.MGLT.Value;
    if (updateDto.StarshipClass is not null)
        starship.StarshipClass = updateDto.StarshipClass;
    if (updateDto.Pilots is not null)
        starship.Pilots = updateDto.Pilots;
    if (updateDto.Films is not null)
        starship.Films = updateDto.Films;
    if (updateDto.Created.HasValue)
        starship.Created = updateDto.Created.Value;
    if (updateDto.Edited.HasValue)
        starship.Edited = updateDto.Edited.Value;
    if (updateDto.Url is not null)
        starship.Url = updateDto.Url;

    await db.SaveChangesAsync();
    return Results.Ok(starship);
});

// Detete a starship by Id
app.MapDelete("/api/starships/{id:int}", async (int id, AppDbContext db) =>
{
    var starship = await db.Starships.FirstOrDefaultAsync(s => s.Id == id);
    if (starship is null)
        return Results.NotFound();

    db.Starships.Remove(starship);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Create a new starship
app.MapPost("/api/starship", async (AppDbContext db, StarshipDto dto) =>
{
    var starship = dto.ToStarship();
    db.Starships.Add(starship);
    await db.SaveChangesAsync();

    return Results.Created($"/api/starships/{starship.Id}", starship);
});

app.MapHealthChecks("/health");

// Get DB connection info
app.MapGet("/api/dbinfo", async (AppDbContext db, HttpRequest request) =>
{
    var conn = db.Database.GetDbConnection();
    try
    {
        if (conn.State == System.Data.ConnectionState.Closed)
            await conn.OpenAsync();

        var result = Results.Ok(new
        {
            DataSource = conn.DataSource,
            Database = conn.Database,
            ServerVersion = conn.ServerVersion
        });

        return result;
    }
    finally
    {
        if (conn.State == System.Data.ConnectionState.Open)
            await conn.CloseAsync();
    }
})
.WithName("GetSqlConnectionInfo")
.WithTags("Diagnostics");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

// apply any pending migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();

public record SqlConnectionInfo(string DataSource, string Database, string ServerVersion);
