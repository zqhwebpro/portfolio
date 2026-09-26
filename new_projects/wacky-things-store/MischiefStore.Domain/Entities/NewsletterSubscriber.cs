using System;
using System.ComponentModel.DataAnnotations;

namespace MischiefStore.Domain.Entities
{
    public class NewsletterSubscriber
    {
        public int NewsletterSubscriberId { get; set; }

        [Required(ErrorMessage = "Please enter your email address")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        public DateTime SubscribedAt { get; set; }
    }
}
