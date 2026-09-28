namespace ParmaDelivery.Core.Entities;

/// <summary>
/// Represents a scheduled community event or dining celebration post on the Parma Delivery calendar.
/// </summary>
public class CommunityEvent
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    public string Headline { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Event date in ISO format (YYYY-MM-DD).
    /// </summary>
    public string EventDate { get; set; } = string.Empty;

    public string EventTime { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public string ButtonText { get; set; } = "RSVP Now";

    public string ButtonColor { get; set; } = "#b91c1c";

    public string ButtonLink { get; set; } = "#events";

    public string Category { get; set; } = "Community";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
