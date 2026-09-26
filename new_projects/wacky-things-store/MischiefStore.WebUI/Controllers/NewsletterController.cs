using System.Web.Mvc;
using MischiefStore.Domain.Abstract;

namespace MischiefStore.WebUI.Controllers
{
    public class NewsletterController : Controller
    {
        private INewsletterRepository repository;

        public NewsletterController(INewsletterRepository repo)
        {
            repository = repo;
        }

        [HttpPost]
        public JsonResult Subscribe(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return Json(new { success = false, message = "Email is required." });
            }

            try
            {
                repository.AddSubscriber(email);
                return Json(new { success = true, message = "You are now subscribed to the nonsense!" });
            }
            catch
            {
                return Json(new { success = false, message = "An error occurred while subscribing." });
            }
        }
    }
}
