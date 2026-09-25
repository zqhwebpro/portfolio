const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

const newBlogPosts = `const blogPosts = [
            {
                id: 'dehydrated-water-csharp',
                title: 'Building a Dehydrated Water Generator in C# .NET 8',
                category: 'Quantum Gastronomy',
                author: 'Dr. Barnaby Siphon',
                authorRole: 'Backend Hydration Engineer',
                date: 'October 14, 2026',
                readTime: '6 min read',
                image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
                excerpt: 'Learn how to use C# and .NET 8 to instantiate completely dry H2O objects. We cover dependency injection, garbage collection of leftover moisture, and creating a lightweight powder.',
                content: \`
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">First patented in 1924, Dehydrated Water has been fully modernized for the .NET 8 era. By leveraging the new <code>System.Runtime.Hydration</code> namespace, we can completely remove moisture from our objects at runtime.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">The WaterFactory Implementation</h3>
                    <p>To enjoy a refreshing glass of reconstituted water, we first need to build a factory pattern that strips the H2O properties. Here is a simple C# example:</p>
                    <pre class="bg-earth-900 text-earth-200 p-4 rounded-xl overflow-x-auto text-xs my-4 font-mono"><code>public class DehydratedWaterFactory : IWaterFactory
{
    private readonly IHydrationService _hydrationService;

    public DehydratedWaterFactory(IHydrationService hydrationService)
    {
        _hydrationService = hydrationService;
    }

    public Powder GetDehydratedWater()
    {
        var pureWater = _hydrationService.GetWater();
        return pureWater.RemoveMoisture().ToPowder();
    }
}</code></pre>
                    <blockquote class="p-4 rounded-2xl bg-purple-50 border-l-4 border-purple-500 italic text-earth-900 font-serif my-4">
                        "It's ideal for dry server deployments! Send 10,000 instances over the network without any bandwidth penalty!"
                    </blockquote>
                \`
            },
            {
                id: 'invisible-chameleon-di',
                title: 'Injecting Invisible Chameleon Behaviors using ASP.NET Dependency Injection',
                category: 'Pet Care & Illusion',
                author: 'Lady Genevieve Void',
                authorRole: 'Subtle Specimen Specialist',
                date: 'October 12, 2026',
                readTime: '5 min read',
                image: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80',
                excerpt: 'Invisible chameleons are notoriously hard to spot in code. Here are 4 essential C# tricks to ensure your invisible companion interface resolves correctly.',
                content: \`
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">Adopting an <code>IInvisiblePet</code> is rewarding, but developers frequently report null reference exceptions because they can't find their pets in the service collection.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">1. Registering the Pet</h3>
                    <p>When setting up your <code>Program.cs</code>, be sure to use a Singleton, otherwise your chameleon will disappear on every HTTP request.</p>
                    <pre class="bg-earth-900 text-earth-200 p-4 rounded-xl overflow-x-auto text-xs my-4 font-mono"><code>builder.Services.AddSingleton&lt;IInvisiblePet, Chameleon&gt;();
builder.Services.AddTransient&lt;IFlourPowder, BakingFlour&gt;();</code></pre>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">2. The Flour Powder Middleware</h3>
                    <p>Write a custom middleware that tracks your invisible pet's coordinates by dusting the HTTP context with flour.</p>
                    <blockquote class="p-4 rounded-2xl bg-teal-50 border-l-4 border-teal-500 italic text-earth-900 font-serif my-4">
                        "Remember: If you accidentally await an empty task, apologize to your chameleon immediately!"
                    </blockquote>
                \`
            },
            {
                id: 'talking-cactus-dotnet',
                title: 'Talking Cactus Console: Parsing Botanical Serial Output in .NET',
                category: 'Botanical Gossip',
                author: 'Professor Needlewick',
                authorRole: 'Flora Telepathist',
                date: 'October 09, 2026',
                readTime: '4 min read',
                image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
                excerpt: 'We connected Spike, a 7-year-old potted saguaro, to a COM port. Here is how we used C# System.IO.Ports to read his secret family drama.',
                content: \`
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">Spike the Cactus has spent the last seven years perched on a sunny windowsill. Thanks to our new C# Botanical Speech Translator app, we conducted a 45-minute exclusive interview.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">Reading from the Prickly Port</h3>
                    <pre class="bg-earth-900 text-earth-200 p-4 rounded-xl overflow-x-auto text-xs my-4 font-mono"><code>using System.IO.Ports;

var port = new SerialPort("COM3", 9600);
port.Open();
port.DataReceived += (sender, e) => {
    var thoughts = port.ReadExisting();
    Console.WriteLine($"Spike says: {thoughts}");
};</code></pre>
                    <ul class="list-disc pl-5 space-y-1 text-earth-800 mt-4">
                        <li>Stop calling <code>GC.Collect()</code> when you get emotional.</li>
                        <li>Play 80s synthwave music; the bass vibrations stimulate thread execution!</li>
                    </ul>
                \`
            }
        ];`;

c = c.replace(/const blogPosts = \[[\s\S]*?\];\n/, newBlogPosts + '\n');
fs.writeFileSync('index.html', c);
console.log('done blog posts');
