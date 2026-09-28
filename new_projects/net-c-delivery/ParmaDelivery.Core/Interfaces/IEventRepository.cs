using ParmaDelivery.Core.Entities;

namespace ParmaDelivery.Core.Interfaces;

public interface IEventRepository
{
    Task<IReadOnlyList<CommunityEvent>> GetAllAsync();
    Task<CommunityEvent?> GetByIdAsync(string id);
    Task<CommunityEvent> CreateAsync(CommunityEvent newEvent);
    Task<bool> DeleteAsync(string id);
    Task<IReadOnlyList<CommunityEvent>> ResetDefaultsAsync();
}
