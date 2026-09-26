using System;
using System.Collections.Generic;
using System.Linq;
using MischiefStore.Domain.Abstract;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Concrete
{
    public class EFNewsletterRepository : INewsletterRepository
    {
        private EFDbContext context = new EFDbContext();

        public IEnumerable<NewsletterSubscriber> Subscribers
        {
            get { return context.NewsletterSubscribers; }
        }

        public void AddSubscriber(string email)
        {
            if (!string.IsNullOrEmpty(email))
            {
                var existing = context.NewsletterSubscribers.FirstOrDefault(s => s.Email == email);
                if (existing == null)
                {
                    context.NewsletterSubscribers.Add(new NewsletterSubscriber
                    {
                        Email = email,
                        SubscribedAt = DateTime.Now
                    });
                    context.SaveChanges();
                }
            }
        }

        public void RemoveSubscriber(int subscriberId)
        {
            NewsletterSubscriber dbEntry = context.NewsletterSubscribers.Find(subscriberId);
            if (dbEntry != null)
            {
                context.NewsletterSubscribers.Remove(dbEntry);
                context.SaveChanges();
            }
        }
    }
}
