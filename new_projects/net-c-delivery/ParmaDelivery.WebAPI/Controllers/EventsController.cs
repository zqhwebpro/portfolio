using Microsoft.AspNetCore.Mvc;
using ParmaDelivery.Core.Entities;
using ParmaDelivery.Core.Interfaces;

namespace ParmaDelivery.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventRepository _eventRepository;
    private readonly ILogger<EventsController> _logger;

    public EventsController(IEventRepository eventRepository, ILogger<EventsController> logger)
    {
        _eventRepository = eventRepository;
        _logger = logger;
    }

    /// <summary>
    /// GET /api/events?date=YYYY-MM-DD
    /// Retrieves all scheduled community calendar events, with optional date filtering.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CommunityEvent>>> GetAll([FromQuery] string? date = null)
    {
        var events = await _eventRepository.GetAllAsync();
        if (!string.IsNullOrWhiteSpace(date))
        {
            events = events.Where(e => e.EventDate.Equals(date.Trim(), StringComparison.OrdinalIgnoreCase)).ToList();
        }
        return Ok(events);
    }

    /// <summary>
    /// GET /api/events/{id}
    /// Retrieves a specific event by unique ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<CommunityEvent>> GetById(string id)
    {
        var item = await _eventRepository.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound(new { message = $"Event with ID '{id}' was not found." });
        }
        return Ok(item);
    }

    /// <summary>
    /// POST /api/events
    /// Creates a new community calendar event post.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<CommunityEvent>> Create([FromBody] CommunityEvent newEvent)
    {
        if (string.IsNullOrWhiteSpace(newEvent.Headline))
        {
            return BadRequest(new { message = "Headline is required." });
        }

        if (string.IsNullOrWhiteSpace(newEvent.EventDate))
        {
            return BadRequest(new { message = "Event date is required (YYYY-MM-DD)." });
        }

        // Set fallbacks for styling
        if (string.IsNullOrWhiteSpace(newEvent.ButtonText)) newEvent.ButtonText = "RSVP Now";
        if (string.IsNullOrWhiteSpace(newEvent.ButtonColor)) newEvent.ButtonColor = "#b91c1c";
        if (string.IsNullOrWhiteSpace(newEvent.ButtonLink)) newEvent.ButtonLink = "#events";
        if (string.IsNullOrWhiteSpace(newEvent.ImageUrl))
        {
            newEvent.ImageUrl = "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80";
        }

        var created = await _eventRepository.CreateAsync(newEvent);
        _logger.LogInformation("Created new community event: {Headline} on {Date}", created.Headline, created.EventDate);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// DELETE /api/events/{id}
    /// Deletes a community calendar event post.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _eventRepository.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = $"Event with ID '{id}' not found." });
        }
        _logger.LogInformation("Deleted event ID: {Id}", id);
        return Ok(new { success = true, message = $"Event '{id}' deleted successfully." });
    }

    /// <summary>
    /// POST /api/events/reset
    /// Restores the factory example community events.
    /// </summary>
    [HttpPost("reset")]
    public async Task<ActionResult<IEnumerable<CommunityEvent>>> ResetDefaults()
    {
        var defaults = await _eventRepository.ResetDefaultsAsync();
        _logger.LogInformation("Reset events to default community seed data.");
        return Ok(defaults);
    }
}
