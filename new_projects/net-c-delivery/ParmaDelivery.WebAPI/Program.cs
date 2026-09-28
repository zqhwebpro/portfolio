using ParmaDelivery.Core.Interfaces;
using ParmaDelivery.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Dependency Injection: Bind IEventRepository to JsonEventRepository singleton
builder.Services.AddSingleton<IEventRepository, JsonEventRepository>();

// Configure CORS for web frontend integration (local dev & hosted frontends)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();

// Health / Status ping endpoint
app.MapGet("/", () => Results.Ok(new
{
    service = "Parma Sub & Fry Co. — ASP.NET Core 9 Web API",
    version = "9.0.0",
    status = "Online",
    timestamp = DateTime.UtcNow,
    endpoints = new[]
    {
        "GET /api/events",
        "POST /api/events",
        "DELETE /api/events/{id}",
        "POST /api/events/reset"
    }
}));

app.Run();
