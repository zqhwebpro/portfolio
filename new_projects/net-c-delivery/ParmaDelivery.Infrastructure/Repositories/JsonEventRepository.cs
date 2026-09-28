using System.Text.Json;
using ParmaDelivery.Core.Entities;
using ParmaDelivery.Core.Interfaces;

namespace ParmaDelivery.Infrastructure.Repositories;

public class JsonEventRepository : IEventRepository
{
    private readonly string _filePath;
    private readonly SemaphoreSlim _semaphore = new(1, 1);
    private List<CommunityEvent>? _cachedEvents;

    public JsonEventRepository(string? customPath = null)
    {
        _filePath = customPath ?? Path.Combine(AppContext.BaseDirectory, "events.json");
    }

    private static List<CommunityEvent> GetDefaultSeedEvents() =>
    [
        new CommunityEvent
        {
            Id = "evt-1",
            Headline = "Sunday Tailgate Buffet & Large Pizza Special",
            Description = "Join us for our game day buffet featuring hearth-baked pizza slices, slow-simmered marinara meatball sliders, garlic knots, and loaded bacon cheddar fry boats with live big-screen broadcasts.",
            EventDate = "2026-10-04",
            EventTime = "1:00 PM – 6:00 PM",
            ImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
            ButtonText = "Reserve Buffet Table",
            ButtonColor = "#b91c1c",
            ButtonLink = "#events",
            Category = "Dining Special"
        },
        new CommunityEvent
        {
            Id = "evt-2",
            Headline = "South Central PA Youth Sports Fundraiser Night",
            Description = "15% of all delivery sub, fry, and pizza orders directly benefits York & Lancaster youth soccer and baseball leagues. Show your local league jersey for a free basket of cinnamon dough bites!",
            EventDate = "2026-10-11",
            EventTime = "4:30 PM – 9:00 PM",
            ImageUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            ButtonText = "RSVP Your Team",
            ButtonColor = "#d97706",
            ButtonLink = "#events",
            Category = "Fundraiser"
        },
        new CommunityEvent
        {
            Id = "evt-3",
            Headline = "Live Acoustic Patio & Pennsylvania Birch Beer Tasting",
            Description = "Relax on the patio with live acoustic performance by local York County artists, featuring craft PA draught birch beer tastings paired with fresh Italian hoagies and crispy crinkle-cut fries.",
            EventDate = "2026-10-18",
            EventTime = "6:00 PM – 9:30 PM",
            ImageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            ButtonText = "Save a Seat",
            ButtonColor = "#059669",
            ButtonLink = "#events",
            Category = "Live Music"
        },
        new CommunityEvent
        {
            Id = "evt-4",
            Headline = "Halloween Spooky Loaded Fries & Cheesesteak Fest",
            Description = "Costume contest for all ages, spooky black-garlic loaded bacon fries, shaved ribeye ghost-pepper jack cheesesteaks, and candy bags for every delivery kid order placed all weekend.",
            EventDate = "2026-10-25",
            EventTime = "5:00 PM – 10:00 PM",
            ImageUrl = "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
            ButtonText = "Costume Contest Sign-Up",
            ButtonColor = "#ea580c",
            ButtonLink = "#events",
            Category = "Holiday Fest"
        },
        new CommunityEvent
        {
            Id = "evt-5",
            Headline = "First Responders Charity Appreciation Dinner",
            Description = "Free small hot sub or personal pan pizza for active EMT, Firefighters, and Police officers with valid ID. Supporting our local emergency squads throughout York and Lancaster counties.",
            EventDate = "2026-11-07",
            EventTime = "12:00 PM – 8:00 PM",
            ImageUrl = "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
            ButtonText = "Community Details",
            ButtonColor = "#2563eb",
            ButtonLink = "#events",
            Category = "Charity"
        }
    ];

    private async Task EnsureLoadedAsync()
    {
        if (_cachedEvents != null) return;

        if (File.Exists(_filePath))
        {
            try
            {
                var json = await File.ReadAllTextAsync(_filePath);
                var items = JsonSerializer.Deserialize<List<CommunityEvent>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                _cachedEvents = items ?? GetDefaultSeedEvents();
                return;
            }
            catch
            {
                // Fallback to defaults if file corrupt
            }
        }

        _cachedEvents = GetDefaultSeedEvents();
        await SaveToFileAsync();
    }

    private async Task SaveToFileAsync()
    {
        if (_cachedEvents == null) return;
        var json = JsonSerializer.Serialize(_cachedEvents, new JsonSerializerOptions
        {
            WriteIndented = true
        });
        await File.WriteAllTextAsync(_filePath, json);
    }

    public async Task<IReadOnlyList<CommunityEvent>> GetAllAsync()
    {
        await _semaphore.WaitAsync();
        try
        {
            await EnsureLoadedAsync();
            return _cachedEvents!.OrderBy(e => e.EventDate).ToList();
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<CommunityEvent?> GetByIdAsync(string id)
    {
        await _semaphore.WaitAsync();
        try
        {
            await EnsureLoadedAsync();
            return _cachedEvents!.FirstOrDefault(e => e.Id == id);
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<CommunityEvent> CreateAsync(CommunityEvent newEvent)
    {
        await _semaphore.WaitAsync();
        try
        {
            await EnsureLoadedAsync();
            if (string.IsNullOrWhiteSpace(newEvent.Id))
            {
                newEvent.Id = Guid.NewGuid().ToString("N");
            }
            newEvent.CreatedAt = DateTime.UtcNow;
            _cachedEvents!.Add(newEvent);
            await SaveToFileAsync();
            return newEvent;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<bool> DeleteAsync(string id)
    {
        await _semaphore.WaitAsync();
        try
        {
            await EnsureLoadedAsync();
            var count = _cachedEvents!.RemoveAll(e => e.Id == id);
            if (count > 0)
            {
                await SaveToFileAsync();
                return true;
            }
            return false;
        }
        finally
        {
            _semaphore.Release();
        }
    }

    public async Task<IReadOnlyList<CommunityEvent>> ResetDefaultsAsync()
    {
        await _semaphore.WaitAsync();
        try
        {
            _cachedEvents = GetDefaultSeedEvents();
            await SaveToFileAsync();
            return _cachedEvents;
        }
        finally
        {
            _semaphore.Release();
        }
    }
}
