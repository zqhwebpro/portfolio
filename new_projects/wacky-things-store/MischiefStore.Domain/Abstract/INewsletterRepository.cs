using System.Collections.Generic;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Abstract
{
    public interface INewsletterRepository
    {
        IEnumerable<NewsletterSubscriber> Subscribers { get; }
        void AddSubscriber(string email);
        void RemoveSubscriber(int subscriberId);
    }
}
