<?php
/**
 * ==============================================================================
 * PHP FUNDAMENTALS WITH time() — An Interactive Masterclass
 * ==============================================================================
 * A comprehensive, self-contained educational application demonstrating core PHP
 * programming principles — variables, data types, arithmetic, conditionals,
 * functions, arrays, loops, and OOP — through the lens of Unix Epoch time.
 * ==============================================================================
 */

// Global Time References for Live Server-Side Calculations
$serverEpoch = time();
$serverMicro = microtime(true);
$serverDateFormatted = date('Y-m-d H:i:s T', $serverEpoch);
$serverHour = (int)date('G', $serverEpoch);
$serverYear = (int)date('Y', $serverEpoch);

// Module 2 Math Calculations
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR   = 3600;
const SECONDS_IN_DAY    = 86400;
const SECONDS_IN_WEEK   = 604800;

$tomorrowEpoch  = $serverEpoch + SECONDS_IN_DAY;
$yesterdayEpoch = $serverEpoch - SECONDS_IN_DAY;
$nextWeekEpoch  = $serverEpoch + SECONDS_IN_WEEK;
$secondOfMinute = $serverEpoch % 60;
$minuteOfHour   = (int)floor(($serverEpoch % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

// Module 3 Conditional Greetings
$timeOfDayGreeting = match(true) {
    $serverHour >= 5  && $serverHour < 12 => 'Good morning ☕',
    $serverHour >= 12 && $serverHour < 17 => 'Good afternoon ☀️',
    $serverHour >= 17 && $serverHour < 21 => 'Good evening 🌇',
    default                               => 'Good night 🌙',
};
$isEvenSecond = ($serverEpoch % 2 === 0);
$isLeapYear   = (bool)date('L', $serverEpoch);

// Module 5 Epoch Milestones Array
$epochMilestones = [
    'Unix Epoch Genesis' => [
        'timestamp' => 0,
        'date'      => '1970-01-01 00:00:00 UTC',
        'desc'      => 'The dawn of Unix time. 0 seconds elapsed.'
    ],
    'The Y2K Millennium' => [
        'timestamp' => 946684800,
        'date'      => '2000-01-01 00:00:00 UTC',
        'desc'      => 'Turn of the 21st century.'
    ],
    'PHP 1.0 Released' => [
        'timestamp' => 802569600,
        'date'      => '1995-06-08 00:00:00 UTC',
        'desc'      => 'Rasmus Lerdorf announces "Personal Home Page Tools".'
    ],
    'Current Server Moment' => [
        'timestamp' => $serverEpoch,
        'date'      => $serverDateFormatted,
        'desc'      => 'Your live request right now.'
    ],
    'Year 2038 Overflow (32-bit Limit)' => [
        'timestamp' => 2147483647,
        'date'      => '2038-01-19 03:14:07 UTC',
        'desc'      => 'Maximum signed 32-bit integer limit (2^31 - 1).'
    ]
];

// Module 6 Custom Helper Function
function formatTimeDelta(int $fromTimestamp, ?int $toTimestamp = null): string {
    $to = $toTimestamp ?? time();
    $diff = abs($to - $fromTimestamp);

    $days    = (int)floor($diff / 86400);
    $hours   = (int)floor(($diff % 86400) / 3600);
    $minutes = (int)floor(($diff % 3600) / 60);
    $seconds = $diff % 60;

    $parts = [];
    if ($days > 0)    $parts[] = "{$days}d";
    if ($hours > 0)   $parts[] = "{$hours}h";
    if ($minutes > 0) $parts[] = "{$minutes}m";
    $parts[] = "{$seconds}s";

    $direction = ($to >= $fromTimestamp) ? 'elapsed' : 'remaining';
    return implode(' ', $parts) . " ($direction)";
}

// Module 7 Object Oriented Class Demonstration
class TimeCapsule {
    private int $createdEpoch;
    private string $author;
    private string $message;

    public function __construct(string $message, string $author = 'PHP Learner') {
        $this->createdEpoch = time();
        $this->message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
        $this->author = htmlspecialchars($author, ENT_QUOTES, 'UTF-8');
    }

    public function getSummary(): array {
        return [
            'author'    => $this->author,
            'message'   => $this->message,
            'epoch'     => $this->createdEpoch,
            'formatted' => date('l, F j, Y @ g:i:s A', $this->createdEpoch),
            'age_delta' => formatTimeDelta($this->createdEpoch)
        ];
    }
}

$demoCapsule = new TimeCapsule("Learning PHP fundamentals via time() is intuitive and powerful!", "Antigravity Dev");
$capsuleData = $demoCapsule->getSummary();
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Fundamentals with time() — Interactive Masterclass</title>
    <meta name="description" content="Learn PHP fundamentals — variables, arithmetic, conditionals, functions, arrays, loops, and OOP — through the lens of Unix Epoch time().">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        display: ['Outfit', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        php: {
                            50: '#F3F4FB',
                            100: '#E4E7F6',
                            300: '#A3B1E1',
                            400: '#8892BF',
                            500: '#777BB4', // Iconic PHP Purple
                            600: '#5F6399',
                            700: '#4A4D7C',
                            800: '#2A2C46',
                            900: '#171827',
                            950: '#0E0F19',
                        },
                        amberGlow: '#F59E0B',
                        cyanGlow: '#06B6D4',
                        emeraldGlow: '#10B981',
                    }
                }
            }
        }
    </script>

    <style>
        :root {
            --bg-canvas: #090A10;
            --card-bg: rgba(20, 22, 36, 0.75);
            --card-border: rgba(119, 123, 180, 0.22);
            --code-bg: #0C0D17;
        }

        body {
            background-color: var(--bg-canvas);
            color: #E2E8F0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-image: 
                radial-gradient(at 15% 15%, rgba(119, 123, 180, 0.12) 0px, transparent 45%),
                radial-gradient(at 85% 80%, rgba(6, 182, 212, 0.08) 0px, transparent 50%),
                radial-gradient(at 50% 50%, rgba(245, 158, 11, 0.04) 0px, transparent 65%);
            background-attachment: fixed;
        }

        /* Glassmorphic Panel */
        .glass-panel {
            background: var(--card-bg);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset;
        }

        .glass-panel:hover {
            border-color: rgba(119, 123, 180, 0.4);
            box-shadow: 0 14px 40px -10px rgba(0, 0, 0, 0.75), 0 0 20px rgba(119, 123, 180, 0.1);
        }

        /* Code Block Styling */
        .code-block {
            background: var(--code-bg);
            border: 1px solid rgba(119, 123, 180, 0.2);
            border-radius: 12px;
            font-family: 'Fira Code', monospace;
            position: relative;
        }

        .live-output-badge {
            background: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.35);
            color: #34D399;
        }

        /* Syntax colors */
        .hl-tag { color: #F43F5E; font-weight: 600; }
        .hl-var { color: #38BDF8; }
        .hl-fn { color: #A78BFA; }
        .hl-str { color: #34D399; }
        .hl-num { color: #FBBF24; }
        .hl-kw { color: #F472B6; font-weight: 600; }
        .hl-comm { color: #64748B; font-style: italic; }
        .hl-op { color: #94A3B8; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #090A10;
        }
        ::-webkit-scrollbar-thumb {
            background: #2A2C46;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #777BB4;
        }

        /* Epoch Ticker Pulsing Ring */
        @keyframes epochGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(119, 123, 180, 0.3); }
            50% { box-shadow: 0 0 25px rgba(6, 182, 212, 0.5); }
        }
        .epoch-active-box {
            animation: epochGlow 3s infinite ease-in-out;
        }
    </style>
</head>

<body class="min-h-screen flex flex-col selection:bg-php-500 selection:text-white">

    <!-- TOP NAVIGATION BAR -->
    <header class="sticky top-0 z-50 border-b border-php-700/40 bg-php-950/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-php-700 to-php-500 flex items-center justify-center text-white shadow-lg shadow-php-500/20 font-display font-bold text-lg">
                    <i class="fa-brands fa-php"></i>
                </div>
                <div>
                    <h1 class="font-display font-bold text-base sm:text-lg text-white tracking-wide flex items-center gap-2">
                        PHP Fundamentals <span class="text-xs px-2 py-0.5 rounded-full bg-php-500/20 text-php-300 border border-php-500/30 font-mono">time()</span>
                    </h1>
                    <p class="text-[11px] text-slate-400">Interactive Epoch-Driven Programming Guide</p>
                </div>
            </div>

            <!-- Header Quick Nav & Live Clock -->
            <div class="flex items-center gap-4">
                <nav class="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
                    <a href="#module-1" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Variables</a>
                    <a href="#module-2" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Arithmetic</a>
                    <a href="#module-3" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Conditionals</a>
                    <a href="#module-4" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Date Functions</a>
                    <a href="#module-5" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Arrays & Loops</a>
                    <a href="#module-6" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">Functions</a>
                    <a href="#module-7" class="px-3 py-1.5 rounded-lg hover:bg-php-800/60 hover:text-white transition-all">OOP</a>
                    <a href="#playground" class="px-3 py-1.5 rounded-lg bg-php-500/20 text-php-300 border border-php-500/40 hover:bg-php-500 hover:text-white transition-all font-semibold">Time Lab</a>
                    <a href="./case-study.html" class="px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition-all font-semibold flex items-center gap-1.5" title="View Project Case Study">
                        <i class="fa-solid fa-book-open text-xs"></i>
                        <span>Case Study</span>
                    </a>
                </nav>

                <div class="flex items-center gap-2 bg-php-900/90 border border-php-700/50 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300">
                    <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span id="navLiveEpoch"><?= $serverEpoch ?></span>
                </div>
            </div>
        </div>
    </header>

    <!-- HERO SECTION WITH LIVE REAL-TIME TICKER -->
    <section class="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-php-800/40 overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-7 space-y-5">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-php-500/10 border border-php-500/30 text-php-300 text-xs font-medium">
                    <i class="fa-solid fa-graduation-cap"></i> PHP 8.x Core Curriculum
                </div>
                <h2 class="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    Master PHP Fundamentals <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-php-300 via-cyan-300 to-amber-300">
                        Powered by <code class="font-mono text-white text-3xl sm:text-4xl">time();</code>
                    </span>
                </h2>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Every dynamic web application handles time: session expirations, scheduled cron jobs, database timestamps, authentication tokens, and user age verification. By mastering PHP’s fundamental constructs through the lens of Unix Epoch time, you gain an intuitive understanding of variables, data types, arithmetic, conditional branching, loops, functions, and object-oriented architecture.
                </p>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                    <a href="#module-1" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-php-600 to-php-500 hover:from-php-500 hover:to-php-400 text-white font-semibold text-sm shadow-lg shadow-php-500/25 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-play text-xs"></i> Start Lesson 1
                    </a>
                    <a href="#playground" class="px-5 py-2.5 rounded-xl bg-php-900/80 hover:bg-php-800 border border-php-600/40 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2">
                        <i class="fa-solid fa-flask text-amber-400"></i> Open Interactive Time Lab
                    </a>
                </div>
            </div>

            <!-- LIVE HERO TIME CARD -->
            <div class="lg:col-span-5">
                <div class="glass-panel p-6 space-y-4 epoch-active-box">
                    <div class="flex items-center justify-between border-b border-php-700/40 pb-3">
                        <div class="flex items-center gap-2">
                            <span class="h-3 w-3 rounded-full bg-emerald-400 animate-ping"></span>
                            <span class="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">Live PHP Runtime Evaluator</span>
                        </div>
                        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-php-900 text-php-300 border border-php-700">PHP 8.2+</span>
                    </div>

                    <div class="space-y-3">
                        <div>
                            <span class="text-xs text-slate-400 block mb-1">Evaluated <code class="text-php-300 font-mono">time()</code> Epoch Output:</span>
                            <div class="bg-php-950 p-3 rounded-xl border border-php-700/50 flex items-center justify-between">
                                <span id="heroEpochDisplay" class="font-mono font-bold text-2xl sm:text-3xl text-cyan-300 tracking-wider">
                                    <?= $serverEpoch ?>
                                </span>
                                <span class="text-[10px] font-mono text-slate-400 uppercase">Seconds</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                            <div class="bg-php-950/80 p-2.5 rounded-lg border border-php-800">
                                <span class="text-[10px] text-slate-400 block">date('Y-m-d H:i:s')</span>
                                <span id="heroDateDisplay" class="text-amber-300 font-semibold truncate block"><?= $serverDateFormatted ?></span>
                            </div>
                            <div class="bg-php-950/80 p-2.5 rounded-lg border border-php-800">
                                <span class="text-[10px] text-slate-400 block">microtime(true)</span>
                                <span id="heroMicroDisplay" class="text-emerald-300 font-semibold truncate block"><?= number_format($serverMicro, 4, '.', '') ?></span>
                            </div>
                        </div>

                        <div class="p-3 rounded-lg bg-php-500/10 border border-php-500/25 text-xs text-slate-300 flex items-center justify-between">
                            <span>Time of Day Greeting:</span>
                            <span class="font-bold text-white"><?= $timeOfDayGreeting ?></span>
                        </div>
                    </div>

                    <div class="text-[11px] text-slate-400 text-center italic">
                        Real Unix Epoch timestamp computed dynamically.
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- MAIN CURRICULUM CONTAINER -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1">

        <!-- MODULE 1: THE UNIX TIMESTAMP & VARIABLES -->
        <article id="module-1" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 01</span>
                    <h3 class="font-display font-bold text-2xl text-white">The Unix Epoch, Declaring Variables & Data Types</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-php-500/15 text-php-300 border border-php-500/30">
                    $variables &amp; gettype()
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                In PHP, all variables begin with a dollar sign (<code class="font-mono text-cyan-300">$</code>) and are dynamically typed. The built-in <code class="font-mono text-amber-300">time()</code> function returns the current <strong>Unix timestamp</strong>: an integer representing the exact count of seconds that have passed since <strong>January 1, 1970 00:00:00 UTC</strong> (The Unix Epoch).
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson1_variables.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-comm">// 1. Call time() and store the integer in a variable</span>
<span class="hl-var">$currentTimestamp</span> <span class="hl-op">=</span> <span class="hl-fn">time</span>();

<span class="hl-comm">// 2. Inspect the variable's internal data type</span>
<span class="hl-var">$dataType</span> <span class="hl-op">=</span> <span class="hl-fn">gettype</span>(<span class="hl-var">$currentTimestamp</span>);

<span class="hl-comm">// 3. Store descriptive text (string)</span>
<span class="hl-var">$epochName</span> <span class="hl-op">=</span> <span class="hl-str">"Unix Epoch Time"</span>;

<span class="hl-comm">// 4. Boolean flag checking if time is non-zero</span>
<span class="hl-var">$isValidEpoch</span> <span class="hl-op">=</span> <span class="hl-var">$currentTimestamp</span> <span class="hl-op">&gt;</span> <span class="hl-num">0</span>;

<span class="hl-comm">// 5. Output with double-quoted string interpolation</span>
<span class="hl-kw">echo</span> <span class="hl-str">"Current {$epochName}: {$currentTimestamp} (Type: {$dataType})"</span>;
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 space-y-1.5">
                            <div>Current Unix Epoch Time: <span class="text-amber-300 font-bold"><?= $serverEpoch ?></span> (Type: <span class="text-cyan-300"><?= gettype($serverEpoch) ?></span>)</div>
                            <div class="text-slate-400">Boolean check ($isValidEpoch): <span class="text-white">true</span></div>
                        </div>
                    </div>

                    <div class="p-3 bg-php-900/50 rounded-lg border border-php-700/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-php-300 flex items-center gap-1.5"><i class="fa-solid fa-lightbulb text-amber-400"></i> Key PHP Takeaway:</strong>
                        <p>PHP variables are loosely typed and case-sensitive (<code class="font-mono text-cyan-300">$time</code> is different from <code class="font-mono text-cyan-300">$Time</code>). Double-quoted strings support variable interpolation directly!</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 2: TIME ARITHMETIC & CONSTANTS -->
        <article id="module-2" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 02</span>
                    <h3 class="font-display font-bold text-2xl text-white">Arithmetic Operators, Constants &amp; Modulo Clock Math</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    Math, const &amp; % Modulo
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                Because <code class="font-mono text-amber-300">time()</code> returns a standard integer of seconds, you can calculate past and future times using fundamental arithmetic operators (<code class="font-mono text-cyan-300">+</code>, <code class="font-mono text-cyan-300">-</code>, <code class="font-mono text-cyan-300">*</code>, <code class="font-mono text-cyan-300">/</code>, <code class="font-mono text-cyan-300">%</code>). Constants in PHP are declared using <code class="font-mono text-pink-400">const</code> or <code class="font-mono text-pink-400">define()</code>.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson2_arithmetic.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-comm">// 1. Declare immutable time constants</span>
<span class="hl-kw">const</span> <span class="hl-num">SECONDS_PER_MINUTE</span> <span class="hl-op">=</span> <span class="hl-num">60</span>;
<span class="hl-kw">const</span> <span class="hl-num">SECONDS_PER_HOUR</span>   <span class="hl-op">=</span> <span class="hl-num">3600</span>;
<span class="hl-kw">const</span> <span class="hl-num">SECONDS_PER_DAY</span>    <span class="hl-op">=</span> <span class="hl-num">86400</span>; <span class="hl-comm">// 24 * 60 * 60</span>

<span class="hl-var">$now</span> <span class="hl-op">=</span> <span class="hl-fn">time</span>();

<span class="hl-comm">// 2. Arithmetic addition &amp; subtraction</span>
<span class="hl-var">$tomorrow</span>   <span class="hl-op">=</span> <span class="hl-var">$now</span> <span class="hl-op">+</span> <span class="hl-num">SECONDS_PER_DAY</span>;
<span class="hl-var">$yesterday</span>  <span class="hl-op">=</span> <span class="hl-var">$now</span> <span class="hl-op">-</span> <span class="hl-num">SECONDS_PER_DAY</span>;
<span class="hl-var">$nextWeek</span>   <span class="hl-op">=</span> <span class="hl-var">$now</span> <span class="hl-op">+</span> (<span class="hl-num">7</span> <span class="hl-op">*</span> <span class="hl-num">SECONDS_PER_DAY</span>);

<span class="hl-comm">// 3. Modulo operator (%) for cyclic time slices</span>
<span class="hl-var">$currentSecondOfMinute</span> <span class="hl-op">=</span> <span class="hl-var">$now</span> <span class="hl-op">%</span> <span class="hl-num">SECONDS_PER_MINUTE</span>;
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-slate-400">Now:</span>
                                <span class="text-cyan-300 font-bold"><?= $serverEpoch ?></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">+ 86400 (Tomorrow):</span>
                                <span class="text-emerald-300"><?= $tomorrowEpoch ?> <span class="text-[10px] text-slate-500">(<?= date('M j', $tomorrowEpoch) ?>)</span></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-400">- 86400 (Yesterday):</span>
                                <span class="text-amber-300"><?= $yesterdayEpoch ?> <span class="text-[10px] text-slate-500">(<?= date('M j', $yesterdayEpoch) ?>)</span></span>
                            </div>
                            <div class="flex justify-between border-t border-slate-800 pt-2">
                                <span class="text-slate-400">Current Second ($now % 60):</span>
                                <span class="text-pink-300 font-bold"><?= $secondOfMinute ?>s</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 bg-cyan-950/40 rounded-lg border border-cyan-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-cyan-300 flex items-center gap-1.5"><i class="fa-solid fa-calculator"></i> Math Tip:</strong>
                        <p>The modulo operator <code class="font-mono text-pink-300">%</code> returns the remainder of integer division, making it the ideal tool for wrapping time units (seconds 0-59, hours 0-23).</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 3: CONDITIONALS & CONTROL FLOW -->
        <article id="module-3" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 03</span>
                    <h3 class="font-display font-bold text-2xl text-white">Conditionals, Ternary Operator &amp; PHP 8 match() Expressions</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    if / else / match()
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                PHP provides rich control flow statements. You can use standard <code class="font-mono text-pink-400">if-elseif-else</code> blocks, concise ternary expressions (<code class="font-mono text-cyan-300">? :</code>), or modern PHP 8 <code class="font-mono text-pink-400">match()</code> expressions for strict, return-oriented branching.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson3_conditionals.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-var">$currentHour</span> <span class="hl-op">=</span> (<span class="hl-kw">int</span>)<span class="hl-fn">date</span>(<span class="hl-str">'G'</span>, <span class="hl-fn">time</span>()); <span class="hl-comm">// 0 through 23</span>

<span class="hl-comm">// 1. Modern PHP 8 match expression</span>
<span class="hl-var">$greeting</span> <span class="hl-op">=</span> <span class="hl-kw">match</span>(<span class="hl-kw">true</span>) {
    <span class="hl-var">$currentHour</span> <span class="hl-op">&gt;=</span> <span class="hl-num">5</span>  <span class="hl-op">&amp;&amp;</span> <span class="hl-var">$currentHour</span> <span class="hl-op">&lt;</span> <span class="hl-num">12</span> <span class="hl-op">=&gt;</span> <span class="hl-str">'Good morning ☕'</span>,
    <span class="hl-var">$currentHour</span> <span class="hl-op">&gt;=</span> <span class="hl-num">12</span> <span class="hl-op">&amp;&amp;</span> <span class="hl-var">$currentHour</span> <span class="hl-op">&lt;</span> <span class="hl-num">17</span> <span class="hl-op">=&gt;</span> <span class="hl-str">'Good afternoon ☀️'</span>,
    <span class="hl-var">$currentHour</span> <span class="hl-op">&gt;=</span> <span class="hl-num">17</span> <span class="hl-op">&amp;&amp;</span> <span class="hl-var">$currentHour</span> <span class="hl-op">&lt;</span> <span class="hl-num">21</span> <span class="hl-op">=&gt;</span> <span class="hl-str">'Good evening 🌇'</span>,
    <span class="hl-kw">default</span>                               <span class="hl-op">=&gt;</span> <span class="hl-str">'Good night 🌙'</span>,
};

<span class="hl-comm">// 2. Ternary operator for parity check</span>
<span class="hl-var">$isEvenTick</span> <span class="hl-op">=</span> (<span class="hl-fn">time</span>() <span class="hl-op">%</span> <span class="hl-num">2</span> <span class="hl-op">===</span> <span class="hl-num">0</span>) <span class="hl-op">?</span> <span class="hl-str">'Even Second'</span> <span class="hl-op">:</span> <span class="hl-str">'Odd Second'</span>;
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                            <div>Current Hour (24h format): <span class="text-cyan-300 font-bold"><?= $serverHour ?>:00</span></div>
                            <div>Evaluated Greeting: <span class="text-amber-300 font-bold"><?= $timeOfDayGreeting ?></span></div>
                            <div>Timestamp Parity: <span class="text-emerald-300 font-bold"><?= $isEvenSecond ? 'Even Second (0)' : 'Odd Second (1)' ?></span></div>
                            <div>Is Leap Year (date('L')): <span class="text-pink-300 font-bold"><?= $isLeapYear ? 'Yes (Leap Year)' : 'No (Standard Year)' ?></span></div>
                        </div>
                    </div>

                    <div class="p-3 bg-amber-950/40 rounded-lg border border-amber-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-amber-300 flex items-center gap-1.5"><i class="fa-solid fa-code-branch"></i> Control Flow Tip:</strong>
                        <p>Unlike traditional <code class="font-mono text-pink-400">switch</code> statements, PHP 8 <code class="font-mono text-pink-400">match</code> uses strict comparison (<code class="font-mono text-cyan-300">===</code>), returns a value directly, and does not require break statements.</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 4: DATE FORMATTING & STRTOTIME -->
        <article id="module-4" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 04</span>
                    <h3 class="font-display font-bold text-2xl text-white">Built-in Date Functions: date(), strtotime() &amp; mktime()</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    date() &amp; strtotime()
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                The <code class="font-mono text-amber-300">date()</code> function transforms an integer timestamp into formatted human text. Conversely, <code class="font-mono text-amber-300">strtotime()</code> parses natural English expressions (like <code class="font-mono text-emerald-300">"+2 weeks"</code>, <code class="font-mono text-emerald-300">"next Monday"</code>, or <code class="font-mono text-emerald-300">"yesterday"</code>) into raw Unix timestamps!
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson4_date_functions.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-var">$epoch</span> <span class="hl-op">=</span> <span class="hl-fn">time</span>();

<span class="hl-comm">// 1. Format into standard formats</span>
<span class="hl-var">$iso8601</span>   <span class="hl-op">=</span> <span class="hl-fn">date</span>(<span class="hl-str">'c'</span>, <span class="hl-var">$epoch</span>);
<span class="hl-var">$readable</span>  <span class="hl-op">=</span> <span class="hl-fn">date</span>(<span class="hl-str">'l, F jS, Y \a\t g:i:s A'</span>, <span class="hl-var">$epoch</span>);

<span class="hl-comm">// 2. Natural language parsing with strtotime()</span>
<span class="hl-var">$inThreeDays</span> <span class="hl-op">=</span> <span class="hl-fn">strtotime</span>(<span class="hl-str">'+3 days'</span>);
<span class="hl-var">$nextFriday</span>  <span class="hl-op">=</span> <span class="hl-fn">strtotime</span>(<span class="hl-str">'next Friday'</span>);

<span class="hl-comm">// 3. Construct exact timestamp with mktime(H, i, s, m, d, Y)</span>
<span class="hl-var">$newYears2030</span> <span class="hl-op">=</span> <span class="hl-fn">mktime</span>(<span class="hl-num">0</span>, <span class="hl-num">0</span>, <span class="hl-num">0</span>, <span class="hl-num">1</span>, <span class="hl-num">1</span>, <span class="hl-num">2030</span>);
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                            <div><span class="text-slate-400">Formatted:</span> <span class="text-amber-300 font-semibold"><?= date('l, F jS, Y \a\t g:i:s A', $serverEpoch) ?></span></div>
                            <div><span class="text-slate-400">ISO 8601 ('c'):</span> <span class="text-cyan-300"><?= date('c', $serverEpoch) ?></span></div>
                            <div><span class="text-slate-400">strtotime('+3 days'):</span> <span class="text-emerald-300"><?= date('Y-m-d (l)', strtotime('+3 days', $serverEpoch)) ?></span></div>
                            <div><span class="text-slate-400">strtotime('next Friday'):</span> <span class="text-pink-300"><?= date('Y-m-d', strtotime('next Friday', $serverEpoch)) ?></span></div>
                        </div>
                    </div>

                    <div class="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-emerald-300 flex items-center gap-1.5"><i class="fa-solid fa-calendar-days"></i> Formatting Tokens:</strong>
                        <p><code class="font-mono text-amber-300">Y</code>=4-digit year, <code class="font-mono text-amber-300">m</code>=01-12 month, <code class="font-mono text-amber-300">d</code>=01-31 day, <code class="font-mono text-amber-300">H</code>=00-23 hour, <code class="font-mono text-amber-300">i</code>=minutes, <code class="font-mono text-amber-300">s</code>=seconds, <code class="font-mono text-amber-300">l</code>=day of week.</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 5: ARRAYS & ITERATION LOOPS -->
        <article id="module-5" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 05</span>
                    <h3 class="font-display font-bold text-2xl text-white">Associative Arrays &amp; foreach / for Loops</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    Arrays &amp; foreach
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                Arrays in PHP are ordered maps that can hold indexed values or key-value pairs (associative arrays). Looping with <code class="font-mono text-pink-400">foreach</code> allows you to iterate over time series collections seamlessly.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson5_arrays_loops.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-comm">// 1. Associative array of historical &amp; future time milestones</span>
<span class="hl-var">$milestones</span> <span class="hl-op">=</span> [
    <span class="hl-str">'Unix Birth'</span>     <span class="hl-op">=&gt;</span> <span class="hl-num">0</span>,
    <span class="hl-str">'Y2K Bug'</span>        <span class="hl-op">=&gt;</span> <span class="hl-num">946684800</span>,
    <span class="hl-str">'Present Moment'</span> <span class="hl-op">=&gt;</span> <span class="hl-fn">time</span>(),
    <span class="hl-str">'Year 2038 Bug'</span>  <span class="hl-op">=&gt;</span> <span class="hl-num">2147483647</span>
];

<span class="hl-comm">// 2. Iterate using foreach($array as $key =&gt; $value)</span>
<span class="hl-kw">foreach</span> (<span class="hl-var">$milestones</span> <span class="hl-kw">as</span> <span class="hl-var">$name</span> <span class="hl-op">=&gt;</span> <span class="hl-var">$epoch</span>) {
    <span class="hl-var">$formattedDate</span> <span class="hl-op">=</span> <span class="hl-fn">date</span>(<span class="hl-str">'Y-m-d H:i'</span>, <span class="hl-var">$epoch</span>);
    <span class="hl-kw">echo</span> <span class="hl-str">"{$name}: {$epoch} =&gt; {$formattedDate}\n"</span>;
}
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                            <?php foreach ($epochMilestones as $name => $data): ?>
                            <div class="flex items-center justify-between border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                                <div>
                                    <strong class="text-slate-200 block text-[11px]"><?= $name ?></strong>
                                    <span class="text-[10px] text-slate-500 font-mono"><?= $data['date'] ?></span>
                                </div>
                                <span class="text-cyan-300 font-bold text-xs"><?= number_format($data['timestamp'], 0, '', ',') ?></span>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="p-3 bg-purple-950/40 rounded-lg border border-purple-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-purple-300 flex items-center gap-1.5"><i class="fa-solid fa-layer-group"></i> Array Essentials:</strong>
                        <p>Associative arrays store key &rarr; value mappings. The <code class="font-mono text-cyan-300">foreach</code> construct is PHP's most performant and cleanest method for traversing lists.</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 6: CUSTOM FUNCTIONS & TYPE HINTING -->
        <article id="module-6" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 06</span>
                    <h3 class="font-display font-bold text-2xl text-white">Custom Functions, Type Declarations &amp; Nullable Types</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-pink-500/15 text-pink-300 border border-pink-500/30">
                    function &amp; Type Hints
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                Functions encapsulate reusable logic. Modern PHP supports strict parameter type declarations (<code class="font-mono text-cyan-300">int</code>, <code class="font-mono text-cyan-300">string</code>, <code class="font-mono text-cyan-300">bool</code>), nullable types (<code class="font-mono text-pink-300">?int</code>), and explicit return types (<code class="font-mono text-emerald-300">: string</code>).
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson6_functions.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-comm">/**
 * Calculate human-readable duration delta between two timestamps
 */</span>
<span class="hl-kw">function</span> <span class="hl-fn">formatTimeDelta</span>(<span class="hl-kw">int</span> <span class="hl-var">$from</span>, <span class="hl-kw">?int</span> <span class="hl-var">$to</span> <span class="hl-op">=</span> <span class="hl-kw">null</span>): <span class="hl-kw">string</span> {
    <span class="hl-comm">// Null coalescing fallback to present moment</span>
    <span class="hl-var">$toTimestamp</span> <span class="hl-op">=</span> <span class="hl-var">$to</span> <span class="hl-op">??</span> <span class="hl-fn">time</span>();
    <span class="hl-var">$diff</span> <span class="hl-op">=</span> <span class="hl-fn">abs</span>(<span class="hl-var">$toTimestamp</span> <span class="hl-op">-</span> <span class="hl-var">$from</span>);

    <span class="hl-var">$days</span>    <span class="hl-op">=</span> (<span class="hl-kw">int</span>)<span class="hl-fn">floor</span>(<span class="hl-var">$diff</span> <span class="hl-op">/</span> <span class="hl-num">86400</span>);
    <span class="hl-var">$hours</span>   <span class="hl-op">=</span> (<span class="hl-kw">int</span>)<span class="hl-fn">floor</span>((<span class="hl-var">$diff</span> <span class="hl-op">%</span> <span class="hl-num">86400</span>) <span class="hl-op">/</span> <span class="hl-num">3600</span>);
    <span class="hl-var">$minutes</span> <span class="hl-op">=</span> (<span class="hl-kw">int</span>)<span class="hl-fn">floor</span>((<span class="hl-var">$diff</span> <span class="hl-op">%</span> <span class="hl-num">3600</span>) <span class="hl-op">/</span> <span class="hl-num">60</span>);
    <span class="hl-var">$seconds</span> <span class="hl-op">=</span> <span class="hl-var">$diff</span> <span class="hl-op">%</span> <span class="hl-num">60</span>;

    <span class="hl-kw">return</span> <span class="hl-str">"{$days}d {$hours}h {$minutes}m {$seconds}s"</span>;
}

<span class="hl-comm">// Call function passing Unix Epoch birth (0)</span>
<span class="hl-var">$ageOfUnix</span> <span class="hl-op">=</span> <span class="hl-fn">formatTimeDelta</span>(<span class="hl-num">0</span>);
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                            <div><span class="text-slate-400">Total Age of Unix Epoch:</span> <span class="text-emerald-300 font-bold"><?= formatTimeDelta(0, $serverEpoch) ?></span></div>
                            <div><span class="text-slate-400">Time Since Y2K (2000):</span> <span class="text-cyan-300"><?= formatTimeDelta(946684800, $serverEpoch) ?></span></div>
                            <div><span class="text-slate-400">Countdown to 2038 Bug:</span> <span class="text-amber-300"><?= formatTimeDelta(2147483647, $serverEpoch) ?></span></div>
                        </div>
                    </div>

                    <div class="p-3 bg-pink-950/40 rounded-lg border border-pink-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-pink-300 flex items-center gap-1.5"><i class="fa-solid fa-shield-halved"></i> Type Safety in PHP:</strong>
                        <p>Type hints (<code class="font-mono text-cyan-300">int $from</code>) and return types (<code class="font-mono text-emerald-300">: string</code>) prevent subtle runtime bugs and document function contracts clearly.</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- MODULE 7: OBJECT-ORIENTED PHP & DATETIMEIMMUTABLE -->
        <article id="module-7" class="glass-panel p-6 sm:p-8 space-y-6">
            <div class="flex items-start justify-between flex-wrap gap-4 border-b border-php-700/30 pb-4">
                <div class="space-y-1">
                    <span class="text-xs font-mono text-php-400 font-bold tracking-widest uppercase">Module 07</span>
                    <h3 class="font-display font-bold text-2xl text-white">Object-Oriented PHP: Classes, Objects &amp; DateTimeImmutable</h3>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    class &amp; DateTime
                </span>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                In modern PHP, procedural <code class="font-mono text-amber-300">time()</code> is complemented by powerful Object-Oriented APIs like <code class="font-mono text-purple-300">DateTimeImmutable</code>. Classes encapsulate state and methods, providing cleaner abstractions for complex domain logic.
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Code Block -->
                <div class="code-block p-4 space-y-2">
                    <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 font-mono">
                        <span><i class="fa-regular fa-file-code text-php-400"></i> lesson7_oop_classes.php</span>
                        <button onclick="copyCode(this)" class="hover:text-white transition-colors text-[11px]"><i class="fa-regular fa-copy"></i> Copy</button>
                    </div>
                    <pre class="text-xs leading-relaxed overflow-x-auto text-slate-200"><code><span class="hl-tag">&lt;?php</span>
<span class="hl-kw">class</span> <span class="hl-fn">TimeCapsule</span> {
    <span class="hl-kw">private</span> <span class="hl-kw">int</span> <span class="hl-var">$createdEpoch</span>;
    <span class="hl-kw">private</span> <span class="hl-kw">string</span> <span class="hl-var">$message</span>;

    <span class="hl-kw">public</span> <span class="hl-kw">function</span> <span class="hl-fn">__construct</span>(<span class="hl-kw">string</span> <span class="hl-var">$msg</span>) {
        <span class="hl-var">$this</span><span class="hl-op">-&gt;</span><span class="hl-var">createdEpoch</span> <span class="hl-op">=</span> <span class="hl-fn">time</span>();
        <span class="hl-var">$this</span><span class="hl-op">-&gt;</span><span class="hl-var">message</span> <span class="hl-op">=</span> <span class="hl-var">$msg</span>;
    }

    <span class="hl-kw">public</span> <span class="hl-kw">function</span> <span class="hl-fn">inspect</span>(): <span class="hl-kw">array</span> {
        <span class="hl-kw">return</span> [
            <span class="hl-str">'message'</span>   <span class="hl-op">=&gt;</span> <span class="hl-var">$this</span><span class="hl-op">-&gt;</span><span class="hl-var">message</span>,
            <span class="hl-str">'timestamp'</span> <span class="hl-op">=&gt;</span> <span class="hl-var">$this</span><span class="hl-op">-&gt;</span><span class="hl-var">createdEpoch</span>,
            <span class="hl-str">'date'</span>      <span class="hl-op">=&gt;</span> <span class="hl-fn">date</span>(<span class="hl-str">'Y-m-d H:i:s'</span>, <span class="hl-var">$this</span><span class="hl-op">-&gt;</span><span class="hl-var">createdEpoch</span>)
        ];
    }
}

<span class="hl-var">$capsule</span> <span class="hl-op">=</span> <span class="hl-kw">new</span> <span class="hl-fn">TimeCapsule</span>(<span class="hl-str">"Mastering PHP via time()"</span>);
<span class="hl-var">$info</span>    <span class="hl-op">=</span> <span class="hl-var">$capsule</span><span class="hl-op">-&gt;</span><span class="hl-fn">inspect</span>();
<span class="hl-tag">?&gt;</span></code></pre>
                </div>

                <!-- Live Evaluated Output -->
                <div class="bg-php-950 p-5 rounded-xl border border-php-800/80 space-y-4 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Live PHP Evaluated Output</span>
                            <span class="live-output-badge text-[11px] font-mono px-2 py-0.5 rounded">Executed</span>
                        </div>
                        <div class="bg-black/60 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                            <div><span class="text-slate-400">Instantiated Class:</span> <span class="text-purple-300 font-bold">TimeCapsule</span></div>
                            <div><span class="text-slate-400">Author:</span> <span class="text-cyan-300"><?= $capsuleData['author'] ?></span></div>
                            <div><span class="text-slate-400">Payload:</span> <span class="text-amber-300">"<?= $capsuleData['message'] ?>"</span></div>
                            <div><span class="text-slate-400">Encapsulated Timestamp:</span> <span class="text-emerald-300 font-bold"><?= $capsuleData['epoch'] ?></span></div>
                        </div>
                    </div>

                    <div class="p-3 bg-blue-950/40 rounded-lg border border-blue-800/40 text-xs text-slate-300 space-y-1">
                        <strong class="text-blue-300 flex items-center gap-1.5"><i class="fa-solid fa-cube"></i> OOP Architecture:</strong>
                        <p>Encapsulation keeps timestamp state private (<code class="font-mono text-pink-300">private int $createdEpoch</code>) and provides clean public interfaces for callers.</p>
                    </div>
                </div>
            </div>
        </article>

        <!-- INTERACTIVE TIME LAB & PLAYGROUND -->
        <section id="playground" class="glass-panel p-6 sm:p-8 space-y-6 border-php-500/50 shadow-2xl">
            <div class="flex items-center justify-between flex-wrap gap-4 border-b border-php-700/40 pb-4">
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg">
                        <i class="fa-solid fa-flask-vial"></i>
                    </div>
                    <div>
                        <h3 class="font-display font-bold text-2xl text-white">Interactive PHP Time Lab &amp; Sandbox</h3>
                        <p class="text-xs text-slate-400">Test live strtotime() natural strings, date format tokens &amp; timestamp math</p>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Live Client &amp; Server Simulator
                </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Preset Buttons -->
                <div class="space-y-3">
                    <label class="text-xs font-bold text-slate-300 uppercase tracking-wider block">Natural Language Presets:</label>
                    <div class="grid grid-cols-1 gap-2">
                        <button onclick="runSandbox('now')" class="px-3 py-2 rounded-lg bg-php-900/80 hover:bg-php-800 border border-php-700 text-xs text-slate-200 font-mono text-left transition-all hover:border-php-500">
                            strtotime("now")
                        </button>
                        <button onclick="runSandbox('+1 day 6 hours')" class="px-3 py-2 rounded-lg bg-php-900/80 hover:bg-php-800 border border-php-700 text-xs text-slate-200 font-mono text-left transition-all hover:border-php-500">
                            strtotime("+1 day 6 hours")
                        </button>
                        <button onclick="runSandbox('next Monday 09:00')" class="px-3 py-2 rounded-lg bg-php-900/80 hover:bg-php-800 border border-php-700 text-xs text-slate-200 font-mono text-left transition-all hover:border-php-500">
                            strtotime("next Monday 09:00")
                        </button>
                        <button onclick="runSandbox('first day of next month')" class="px-3 py-2 rounded-lg bg-php-900/80 hover:bg-php-800 border border-php-700 text-xs text-slate-200 font-mono text-left transition-all hover:border-php-500">
                            strtotime("first day of next month")
                        </button>
                        <button onclick="runSandbox('2038-01-19 03:14:07')" class="px-3 py-2 rounded-lg bg-php-900/80 hover:bg-php-800 border border-php-700 text-xs text-slate-200 font-mono text-left transition-all hover:border-php-500">
                            strtotime("2038-01-19 03:14:07")
                        </button>
                    </div>
                </div>

                <!-- Custom Input and Controls -->
                <div class="space-y-4 md:col-span-2">
                    <div class="space-y-2">
                        <label for="customTimeInput" class="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                            Custom <code class="font-mono text-cyan-300">strtotime()</code> Input String:
                        </label>
                        <div class="flex gap-2">
                            <input id="customTimeInput" type="text" value="+3 days 12 hours" placeholder="e.g. next Friday, +2 weeks, 2030-01-01" 
                                   class="flex-1 bg-php-950 border border-php-700/80 focus:border-cyan-400 px-3.5 py-2 rounded-xl text-xs font-mono text-white focus:outline-none transition-all">
                            <button onclick="evaluateCustomInput()" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md">
                                Evaluate PHP
                            </button>
                        </div>
                    </div>

                    <!-- Sandbox Results Display -->
                    <div class="bg-php-950 p-4 rounded-xl border border-php-800 space-y-3 font-mono text-xs">
                        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span class="text-slate-400">Target Expression:</span>
                            <span id="sbExpression" class="text-cyan-300 font-bold">strtotime("+3 days 12 hours")</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <span class="text-[10px] text-slate-500 block">Computed Epoch Timestamp:</span>
                                <span id="sbTimestamp" class="text-amber-300 font-bold text-sm sm:text-base">-</span>
                            </div>
                            <div>
                                <span class="text-[10px] text-slate-500 block">Human Readable Date:</span>
                                <span id="sbHumanDate" class="text-emerald-300 font-semibold text-xs sm:text-sm">-</span>
                            </div>
                        </div>
                        <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                            <span class="text-slate-400">Time Delta from Present:</span>
                            <span id="sbDelta" class="text-pink-300 font-bold">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- FOOTER -->
    <footer class="border-t border-php-800/40 bg-php-950/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <i class="fa-brands fa-php text-php-400 text-lg"></i>
                <span>PHP Fundamentals Masterclass &bull; Clean Reference for Epoch Time Engineering</span>
            </div>
            <div class="font-mono text-slate-500">
                Server Time: <span class="text-slate-300"><?= $serverDateFormatted ?></span>
            </div>
        </div>
    </footer>

    <!-- CLIENT-SIDE REAL-TIME REFRESH & INTERACTION SCRIPT -->
    <script>
        // Copy code snippet helper
        function copyCode(button) {
            const container = button.closest('.code-block');
            const code = container.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copied!';
                setTimeout(() => button.innerHTML = originalHtml, 2000);
            });
        }

        // Live Real-Time Ticker
        function updateLiveTick() {
            const nowSeconds = Math.floor(Date.now() / 1000);
            const d = new Date();

            const navEpoch = document.getElementById('navLiveEpoch');
            const heroEpoch = document.getElementById('heroEpochDisplay');
            const heroDate = document.getElementById('heroDateDisplay');
            const heroMicro = document.getElementById('heroMicroDisplay');

            if (navEpoch) navEpoch.innerText = nowSeconds;
            if (heroEpoch) heroEpoch.innerText = nowSeconds;
            if (heroDate) heroDate.innerText = d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
            if (heroMicro) heroMicro.innerText = (nowSeconds + (d.getMilliseconds() / 1000)).toFixed(4);
        }

        setInterval(updateLiveTick, 1000);

        // Client Sandbox Evaluator Helper
        function runSandbox(expression) {
            document.getElementById('customTimeInput').value = expression;
            evaluateCustomInput();
        }

        function evaluateCustomInput() {
            const input = document.getElementById('customTimeInput').value.trim();
            const exprLabel = document.getElementById('sbExpression');
            const tsLabel = document.getElementById('sbTimestamp');
            const dateLabel = document.getElementById('sbHumanDate');
            const deltaLabel = document.getElementById('sbDelta');

            exprLabel.innerText = `strtotime("${input}")`;

            const now = new Date();
            let targetDate = new Date();

            const lower = input.toLowerCase();

            if (lower === 'now') {
                targetDate = new Date();
            } else if (lower.includes('day')) {
                const daysMatch = lower.match(/([+-]?\d+)\s*day/);
                const days = daysMatch ? parseInt(daysMatch[1], 10) : 1;
                targetDate.setDate(targetDate.getDate() + days);
            } else if (lower.includes('week')) {
                const weekMatch = lower.match(/([+-]?\d+)\s*week/);
                const weeks = weekMatch ? parseInt(weekMatch[1], 10) : 1;
                targetDate.setDate(targetDate.getDate() + (weeks * 7));
            } else if (lower.includes('next monday')) {
                const day = targetDate.getDay();
                const diff = (8 - day) % 7 || 7;
                targetDate.setDate(targetDate.getDate() + diff);
                targetDate.setHours(9, 0, 0, 0);
            } else if (lower.includes('first day of next month')) {
                targetDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1, 0, 0, 0);
            } else if (!isNaN(Date.parse(input))) {
                targetDate = new Date(input);
            } else {
                targetDate = new Date(Date.now() + (3 * 86400 * 1000) + (12 * 3600 * 1000));
            }

            const targetEpoch = Math.floor(targetDate.getTime() / 1000);
            const nowEpoch = Math.floor(now.getTime() / 1000);
            const diffSeconds = targetEpoch - nowEpoch;

            tsLabel.innerText = targetEpoch.toLocaleString();
            dateLabel.innerText = targetDate.toUTCString();

            const absDiff = Math.abs(diffSeconds);
            const d = Math.floor(absDiff / 86400);
            const h = Math.floor((absDiff % 86400) / 3600);
            const m = Math.floor((absDiff % 3600) / 60);
            const s = absDiff % 60;

            const direction = diffSeconds >= 0 ? 'in future' : 'in past';
            deltaLabel.innerText = `${d}d ${h}h ${m}m ${s}s (${direction})`;
        }

        // Initialize sandbox on page load
        document.addEventListener('DOMContentLoaded', () => {
            evaluateCustomInput();
        });
    </script>
</body>

</html>
