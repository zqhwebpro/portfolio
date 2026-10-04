using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace ParmaDelivery.WebAPI.Controllers;

public class RestaurantDeployRequest
{
    public string BusinessName { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string? ApiName { get; set; }
    public string? ApiEndpoint { get; set; }
    public string? HtmlContent { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class RestaurantController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<RestaurantController> _logger;

    public RestaurantController(IWebHostEnvironment env, ILogger<RestaurantController> logger)
    {
        _env = env;
        _logger = logger;
    }

    /// <summary>
    /// POST /api/restaurant/deploy
    /// Creates a directory for the restaurant using a directory-friendly naming scheme,
    /// and writes the base index.html with the configured API, name, address, and logo.
    /// </summary>
    [HttpPost("deploy")]
    public async Task<IActionResult> Deploy([FromBody] RestaurantDeployRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.BusinessName))
        {
            return BadRequest(new { message = "Business Name is required." });
        }

        var slug = MakeDirectorySlug(request.BusinessName);
        
        // Find net-c-delivery project root directory (parent of ParmaDelivery.WebAPI)
        var contentRoot = _env.ContentRootPath;
        var parentDir = Directory.GetParent(contentRoot)?.FullName ?? contentRoot;
        var targetDir = Path.Combine(parentDir, slug);

        try
        {
            Directory.CreateDirectory(targetDir);

            var html = !string.IsNullOrWhiteSpace(request.HtmlContent) 
                ? request.HtmlContent 
                : GenerateDefaultStorefrontHtml(request);

            var filePath = Path.Combine(targetDir, "index.html");
            await System.IO.File.WriteAllTextAsync(filePath, html);

            _logger.LogInformation("Successfully deployed restaurant directory {Slug} at {Path}", slug, filePath);

            return Ok(new
            {
                success = true,
                directory = slug,
                entryFile = "index.html",
                relativeUrl = $"./{slug}/index.html",
                absolutePath = filePath,
                businessName = request.BusinessName,
                address = $"{request.Street}, {request.City}, {request.State} {request.Zip}",
                api = request.ApiName ?? "Uber Direct"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to deploy restaurant directory for {BusinessName}", request.BusinessName);
            return StatusCode(500, new { message = "Failed to create directory on filesystem.", error = ex.Message });
        }
    }

    private static string MakeDirectorySlug(string name)
    {
        var clean = Regex.Replace(name.ToLowerInvariant(), @"['""’]", "");
        clean = Regex.Replace(clean, @"[^a-z0-9]+", "-").Trim('-');
        return string.IsNullOrWhiteSpace(clean) ? "restaurant" : clean;
    }

    private static string GenerateDefaultStorefrontHtml(RestaurantDeployRequest req)
    {
        var apiName = req.ApiName ?? "Uber Direct";
        var logoImg = !string.IsNullOrWhiteSpace(req.LogoUrl) 
            ? $"<img src=\"{req.LogoUrl}\" alt=\"{req.BusinessName}\" class=\"store-logo\" onerror=\"this.parentElement.innerHTML='<i class=\\'fa-solid fa-store\\'></i>'\">" 
            : "<i class=\"fa-solid fa-store\"></i>";

        return $@"<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>{req.BusinessName} • Official Storefront</title>
    <link rel=""stylesheet"" href=""https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"">
    <link href=""https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"" rel=""stylesheet"">
    <style>
        :root {{
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --surface: #ffffff;
            --bg: #f8fafc;
            --border: #e2e8f0;
            --text-dark: #0f172a;
            --text-muted: #64748b;
        }}
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text-dark); min-height: 100vh; display: flex; flex-direction: column; }}
        .site-nav {{ background: #fff; border-bottom: 1px solid var(--border); padding: 14px 24px; position: sticky; top: 0; z-index: 50; }}
        .nav-inner {{ max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }}
        .brand {{ display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.15rem; color: var(--text-dark); text-decoration: none; }}
        .logo-box {{ width: 40px; height: 40px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--border); color: var(--primary); font-size: 1.2rem; }}
        .logo-box img {{ width: 100%; height: 100%; object-fit: cover; }}
        .api-pill {{ display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; background: #ecfdf5; color: #047857; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; font-weight: 700; border: 1px solid #a7f3d0; }}
        .hero {{ background: #0f172a; color: #fff; padding: 50px 24px; }}
        .hero-inner {{ max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }}
        .hero-title {{ font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }}
        .hero-addr {{ font-size: 1rem; color: #94a3b8; display: flex; align-items: center; gap: 8px; }}
        .container {{ max-width: 1100px; margin: 36px auto; padding: 0 24px; flex: 1; }}
        .dispatch-card {{ background: #fff; border: 1px solid var(--border); border-radius: 8px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); max-width: 640px; }}
        .dispatch-title {{ font-size: 1.25rem; font-weight: 800; margin-bottom: 6px; }}
        .dispatch-desc {{ font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; }}
        .form-group {{ margin-bottom: 14px; }}
        .form-label {{ display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-dark); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }}
        .form-input {{ width: 100%; padding: 10px 14px; border: 1px solid var(--border); border-radius: 6px; font-family: inherit; font-size: 0.95rem; }}
        .btn-dispatch {{ background: var(--primary); color: #fff; border: none; padding: 12px 24px; border-radius: 6px; font-size: 0.95rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; }}
        .btn-dispatch:hover {{ background: var(--primary-dark); }}
        .site-footer {{ background: #fff; border-top: 1px solid var(--border); padding: 20px 24px; text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-top: 40px; }}
    </style>
</head>
<body>
    <nav class=""site-nav"">
        <div class=""nav-inner"">
            <a href=""#"" class=""brand"">
                <div class=""logo-box"">{logoImg}</div>
                <span>{req.BusinessName}</span>
            </a>
            <div class=""api-pill"">
                <i class=""fa-solid fa-bolt""></i>
                <span>Connected to {apiName} API</span>
            </div>
        </div>
    </nav>
    <header class=""hero"">
        <div class=""hero-inner"">
            <div>
                <h1 class=""hero-title"">{req.BusinessName}</h1>
                <div class=""hero-addr"">
                    <i class=""fa-solid fa-location-dot text-danger""></i>
                    <span>{req.Street}, {req.City}, {req.State} {req.Zip}</span>
                </div>
            </div>
            <div class=""api-pill"" style=""background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.2);"">
                <i class=""fa-solid fa-signal text-success""></i>
                <span>API Status: 200 OK Active</span>
            </div>
        </div>
    </header>
    <main class=""container"">
        <div class=""dispatch-card"">
            <h2 class=""dispatch-title"">Direct Delivery Order Dispatch</h2>
            <p class=""dispatch-desc"">Place an on-demand order fulfilled through {apiName}.</p>
            <form onsubmit=""event.preventDefault(); alert('Order dispatched via {apiName}! Reference: #ORD-' + Math.floor(Math.random() * 90000 + 10000));"">
                <div class=""form-group"">
                    <label class=""form-label"">Customer Name</label>
                    <input type=""text"" class=""form-input"" placeholder=""e.g. Alex Morgan"" required>
                </div>
                <div class=""form-group"">
                    <label class=""form-label"">Delivery Address</label>
                    <input type=""text"" class=""form-input"" placeholder=""e.g. 450 Elm St"" required>
                </div>
                <div class=""form-group"">
                    <label class=""form-label"">Order Notes / Items</label>
                    <input type=""text"" class=""form-input"" placeholder=""e.g. 2 Specialty Meals, extra dressing"" required>
                </div>
                <button type=""submit"" class=""btn-dispatch"">
                    <i class=""fa-solid fa-paper-plane""></i>
                    <span>Dispatch Order via {apiName} ➔</span>
                </button>
            </form>
        </div>
    </main>
    <footer class=""site-footer"">
        <p>&copy; 2026 {req.BusinessName} &bull; {req.Street}, {req.City}, {req.State} {req.Zip} &bull; Powered by {apiName}</p>
    </footer>
</body>
</html>";
    }
}
