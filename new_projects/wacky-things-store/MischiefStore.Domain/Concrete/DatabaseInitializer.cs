using System.Collections.Generic;
using System.Data.Entity;
using MischiefStore.Domain.Entities;

namespace MischiefStore.Domain.Concrete
{
    public class DatabaseInitializer : DropCreateDatabaseIfModelChanges<EFDbContext>
    {
        protected override void Seed(EFDbContext context)
        {
            var products = new List<Product>
            {
                // Classic Gags
                new Product
                {
                    Name = "Sonic Whoopee Cushion 3000",
                    Description = "Self-inflating acoustic masterpiece tuned to realistic resonant frequencies. Unrivaled living room disruption.",
                    Category = "Classic Gags",
                    Price = 12.99m,
                    IconClass = "fa-wind",
                    InStock = true
                },
                new Product
                {
                    Name = "Calibrated Fake Lottery Winner Tickets (Pack of 5)",
                    Description = "Looks, scratches, and barcode-scans like a $500,000 jackpot ticket until the fine print reveals the hilarity.",
                    Category = "Classic Gags",
                    Price = 9.50m,
                    IconClass = "fa-ticket",
                    InStock = true
                },
                new Product
                {
                    Name = "Viper Snap Chewing Gum",
                    Description = "Offer a piece of classic spearmint gum to your unsuspecting pal and watch them jump as the spring snaps their fingers.",
                    Category = "Classic Gags",
                    Price = 6.75m,
                    IconClass = "fa-bolt",
                    InStock = true
                },
                new Product
                {
                    Name = "Disappearing Blue Ink Bottle (4 oz)",
                    Description = "Squirt vivid royal blue ink directly onto your boss's crisp white shirt and watch it vanish without a trace in 90 seconds.",
                    Category = "Classic Gags",
                    Price = 8.99m,
                    IconClass = "fa-droplet",
                    InStock = true
                },

                // Office Mischief
                new Product
                {
                    Name = "Electric Shock Executive Ballpoint Pen",
                    Description = "Looks like a heavy metal executive pen. When someone clicks to write, it delivers a startling yet harmless mild static pulse.",
                    Category = "Office Mischief",
                    Price = 14.50m,
                    IconClass = "fa-pen-fancy",
                    InStock = true
                },
                new Product
                {
                    Name = "Micro Cricket Chirper Device",
                    Description = "Miniature magnetic sonic irritator that emits a crisp cricket chirp at random 5 to 15 minute intervals. Drives entire cubicle floors crazy.",
                    Category = "Office Mischief",
                    Price = 18.25m,
                    IconClass = "fa-bug",
                    InStock = true
                },
                new Product
                {
                    Name = "Liquid Ass Concentrated Stink Mist",
                    Description = "Authentic formulation simulating 100 years of raw sewage and unwashed socks. A single spritz clears conference rooms in seconds.",
                    Category = "Office Mischief",
                    Price = 15.00m,
                    IconClass = "fa-skull-crossbones",
                    InStock = true
                },

                // Close-Up Magic
                new Product
                {
                    Name = "Bicycle Svengali Forcing Deck",
                    Description = "The legendary trick deck allowing amateur magicians to instantly force any card, cut to it blindfolded, and turn the whole deck into that card.",
                    Category = "Close-Up Magic",
                    Price = 16.99m,
                    IconClass = "fa-clone",
                    InStock = true
                },
                new Product
                {
                    Name = "Hyper-Realistic Soft Thumb Tip & Silk Vanish Set",
                    Description = "Professional magician's secret weapon. Push a 6-inch red silk handkerchief into your bare fist and open your hand completely empty.",
                    Category = "Close-Up Magic",
                    Price = 11.50m,
                    IconClass = "fa-hand-sparkles",
                    InStock = true
                },
                new Product
                {
                    Name = "Scotch & Soda Precision Magnetic Coin Trick",
                    Description = "Precision machined brass and silver coin set. A half dollar and Mexican centavo magically merge or teleport right in the spectator's palm.",
                    Category = "Close-Up Magic",
                    Price = 34.99m,
                    IconClass = "fa-coins",
                    InStock = true
                },
                new Product
                {
                    Name = "Invisible Deck (Ultra-Grip Edition)",
                    Description = "Any card thought of by a spectator is found face down in a face up deck. The single greatest mind-reading card routine in magic history.",
                    Category = "Close-Up Magic",
                    Price = 19.99m,
                    IconClass = "fa-eye-slash",
                    InStock = true
                },

                // Stage Illusions
                new Product
                {
                    Name = "Combustion Nitro Flash Paper (20 Sheets)",
                    Description = "High-grade nitrocellulose paper that ignites instantly with a brilliant flash and zero smoke or ash. Perfect for fire magic.",
                    Category = "Stage Illusions",
                    Price = 18.00m,
                    IconClass = "fa-fire",
                    InStock = true
                },
                new Product
                {
                    Name = "Stainless Steel Deluxe Linking Rings (8-Ring Set)",
                    Description = "Solid steel rings that seamlessly melt through each other, forming intricate chains and patterns before unlinking in mid-air.",
                    Category = "Stage Illusions",
                    Price = 49.95m,
                    IconClass = "fa-circle-notch",
                    InStock = true
                },
                new Product
                {
                    Name = "Professional Multiplying Billiard Balls Set (Chameleon Red)",
                    Description = "Produce 1, 2, 3, and 4 high-gloss red billiard balls between your bare fingers with flawless stage optical mechanics.",
                    Category = "Stage Illusions",
                    Price = 28.50m,
                    IconClass = "fa-circle-dot",
                    InStock = true
                }
            };

            products.ForEach(p => context.Products.Add(p));
            context.SaveChanges();
            base.Seed(context);
        }
    }
}
