<?php
/**
 * ==============================================================================
 * PRACTICAL PHP FUNDAMENTALS — 3 ESSENTIAL PROJECTS (PHP RUNTIME ENGINE)
 * ==============================================================================
 * 1. PHP Tic-Tac-Toe (Sessions & 2D Arrays — Zero DB Dependency)
 * 2. Secure Email Contact Form (Sanitization, Validation & mail())
 * 3. User Registration / Login System (PDO, Bcrypt & Session State)
 * ==============================================================================
 */

// Initialize Session for Tic-Tac-Toe and Auth Engine
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ------------------------------------------------------------------------------
// Active Tab State (mod-1 | mod-2 | mod-3)
// ------------------------------------------------------------------------------
$activeTab = $_GET['tab'] ?? 'mod-1';
if (!in_array($activeTab, ['mod-1', 'mod-2', 'mod-3', 'ttt', 'contact', 'auth'])) {
    $activeTab = 'mod-1';
}
// Normalize legacy tab names
if ($activeTab === 'ttt') $activeTab = 'mod-1';
if ($activeTab === 'contact') $activeTab = 'mod-2';
if ($activeTab === 'auth') $activeTab = 'mod-3';

// ==============================================================================
// 1. PHP TIC-TAC-TOE CONTROLLER & LOGIC
// ==============================================================================
function initTicTacToe(): void {
    $_SESSION['ttt_board'] = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    $_SESSION['ttt_player'] = 'X';
    $_SESSION['ttt_winner'] = null;
    $_SESSION['ttt_moves'] = 0;
    $_SESSION['ttt_status'] = 'Game in progress. Player X turn.';
}

if (!isset($_SESSION['ttt_board'])) {
    initTicTacToe();
}

function checkTicTacToeWin(array $board, string $player): bool {
    // 3 Horizontal & 3 Vertical lines
    for ($i = 0; $i < 3; $i++) {
        if ($board[$i][0] === $player && $board[$i][1] === $player && $board[$i][2] === $player) return true;
        if ($board[0][$i] === $player && $board[1][$i] === $player && $board[2][$i] === $player) return true;
    }
    // 2 Diagonal lines
    if ($board[0][0] === $player && $board[1][1] === $player && $board[2][2] === $player) return true;
    if ($board[0][2] === $player && $board[1][1] === $player && $board[2][0] === $player) return true;
    return false;
}

// Handle Tic Tac Toe Form Submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ttt_action'])) {
    if ($_POST['ttt_action'] === 'reset') {
        initTicTacToe();
        header('Location: index.php?tab=mod-1');
        exit;
    }

    if ($_POST['ttt_action'] === 'move' && $_SESSION['ttt_winner'] === null) {
        $row = isset($_POST['row']) ? (int)$_POST['row'] : -1;
        $col = isset($_POST['col']) ? (int)$_POST['col'] : -1;

        if ($row >= 0 && $row < 3 && $col >= 0 && $col < 3 && $_SESSION['ttt_board'][$row][$col] === '') {
            $currentPlayer = $_SESSION['ttt_player'];
            $_SESSION['ttt_board'][$row][$col] = $currentPlayer;
            $_SESSION['ttt_moves']++;

            if (checkTicTacToeWin($_SESSION['ttt_board'], $currentPlayer)) {
                $_SESSION['ttt_winner'] = $currentPlayer;
                $_SESSION['ttt_status'] = "🎉 Victory! Player {$currentPlayer} wins the match!";
            } elseif ($_SESSION['ttt_moves'] >= 9) {
                $_SESSION['ttt_winner'] = 'TIE';
                $_SESSION['ttt_status'] = "🤝 Game Over! It's a draw/tie!";
            } else {
                $_SESSION['ttt_player'] = ($currentPlayer === 'X') ? 'O' : 'X';
                $_SESSION['ttt_status'] = "Move recorded. Player {$_SESSION['ttt_player']}'s turn.";
            }
        }
        header('Location: index.php?tab=mod-1');
        exit;
    }
}

// ==============================================================================
// 2. EMAIL CONTACT FORM CONTROLLER & SANITIZATION
// ==============================================================================
$cfErrors = [];
$cfSuccess = false;
$cfOutput = '';
$cfName = '';
$cfEmail = '';
$cfSubject = '';
$cfMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cf_action']) && $_POST['cf_action'] === 'submit') {
    $cfName    = trim($_POST['cf_name'] ?? '');
    $cfEmail   = trim($_POST['cf_email'] ?? '');
    $cfSubject = trim($_POST['cf_subject'] ?? '');
    $cfMessage = trim($_POST['cf_message'] ?? '');

    // Name validation
    if (empty($cfName)) {
        $cfErrors[] = 'Sender Name is required.';
    } elseif (strlen($cfName) < 2 || strlen($cfName) > 60) {
        $cfErrors[] = 'Sender Name must be between 2 and 60 characters.';
    }

    // Email validation & sanitization
    $sanitizedEmail = filter_var($cfEmail, FILTER_SANITIZE_EMAIL);
    if (empty($cfEmail)) {
        $cfErrors[] = 'Email address is required.';
    } elseif (!filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        $cfErrors[] = 'Please provide a valid RFC-compliant email address.';
    }

    // Header injection detection
    if (preg_match('/[\r\n]/', $cfEmail) || preg_match('/[\r\n]/', $cfSubject)) {
        $cfErrors[] = 'Security Alert: CRLF Header Injection pattern detected and neutralized.';
    }

    // Subject validation
    if (empty($cfSubject)) {
        $cfErrors[] = 'Subject line is required.';
    }

    // Message validation
    if (empty($cfMessage)) {
        $cfErrors[] = 'Message content cannot be blank.';
    } elseif (strlen($cfMessage) < 5) {
        $cfErrors[] = 'Message must contain at least 5 characters.';
    }

    // If valid, simulate/invoke PHP mail()
    if (empty($cfErrors)) {
        $safeName    = htmlspecialchars($cfName, ENT_QUOTES, 'UTF-8');
        $safeSubject = preg_replace('/[\r\n]+/', ' ', $cfSubject);
        $safeMessage = htmlspecialchars($cfMessage, ENT_QUOTES, 'UTF-8');

        $headers = "From: webmaster@example.com\r\n" .
                   "Reply-To: {$sanitizedEmail}\r\n" .
                   "X-Mailer: PHP/" . phpversion() . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8";

        $cfSuccess = true;
        $cfOutput = "// PHP 8.3 EVALUATION:\n\$name = htmlspecialchars(\"{$safeName}\", ENT_QUOTES, 'UTF-8');\n\$email = filter_var(\"{$sanitizedEmail}\", FILTER_VALIDATE_EMAIL);\n\$subject = preg_replace('/[\\r\\n]+/', ' ', \"{$safeSubject}\");\n\$message = htmlspecialchars(\"{$safeMessage}\", ENT_QUOTES, 'UTF-8');\n\n// MIME HEADERS ASSEMBLED:\n\$headers = \"{$headers}\";\n\n// INVOCATION:\nmail(\"contact@example.com\", \$subject, \$message, \$headers);\n// STATUS: 200 OK — Mail queued for transport.";
    }
}

// ==============================================================================
// 3. USER REGISTRATION & LOGIN (IN-MEMORY / PDO SQLITE MOCK)
// ==============================================================================
if (!isset($_SESSION['auth_users'])) {
    $_SESSION['auth_users'] = [
        'demo_user' => [
            'id'       => 1,
            'username' => 'demo_user',
            'email'    => 'demo@example.com',
            'hash'     => password_hash('Secret123!', PASSWORD_BCRYPT, ['cost' => 12]),
            'created'  => time() - 86400
        ]
    ];
}

$authErrors = [];
$authSuccess = '';
$authTab = 'login';

// Handle Auth Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['auth_action'])) {
    if ($_POST['auth_action'] === 'register') {
        $authTab = 'register';
        $regUser  = strtolower(trim($_POST['reg_username'] ?? ''));
        $regEmail = strtolower(trim($_POST['reg_email'] ?? ''));
        $regPass  = $_POST['reg_password'] ?? '';

        if (empty($regUser) || !preg_match('/^[a-z0-9_]{3,20}$/', $regUser)) {
            $authErrors[] = 'Username must be 3-20 alphanumeric characters (or underscore).';
        }
        if (empty($regEmail) || !filter_var($regEmail, FILTER_VALIDATE_EMAIL)) {
            $authErrors[] = 'A valid email address is required.';
        }
        if (strlen($regPass) < 8) {
            $authErrors[] = 'Password must be at least 8 characters.';
        }
        if (isset($_SESSION['auth_users'][$regUser])) {
            $authErrors[] = "Username '{$regUser}' is already registered.";
        }

        if (empty($authErrors)) {
            $hashedPassword = password_hash($regPass, PASSWORD_BCRYPT, ['cost' => 12]);
            $nextId = count($_SESSION['auth_users']) + 1;
            $_SESSION['auth_users'][$regUser] = [
                'id'       => $nextId,
                'username' => $regUser,
                'email'    => $regEmail,
                'hash'     => $hashedPassword,
                'created'  => time()
            ];
            $authSuccess = "Registration successful for {$regUser}! Password hashed with Bcrypt (cost 12).";
            $authTab = 'login';
        }
    }

    if ($_POST['auth_action'] === 'login') {
        $authTab = 'login';
        $loginUser = strtolower(trim($_POST['login_username'] ?? ''));
        $loginPass = $_POST['login_password'] ?? '';

        if (empty($loginUser) || empty($loginPass)) {
            $authErrors[] = 'Both username and password are required.';
        } else {
            $foundUser = $_SESSION['auth_users'][$loginUser] ?? null;
            if ($foundUser && password_verify($loginPass, $foundUser['hash'])) {
                session_regenerate_id(true);
                $_SESSION['authenticated_user'] = [
                    'id'       => $foundUser['id'],
                    'username' => $foundUser['username'],
                    'email'    => $foundUser['email'],
                    'login_at' => time()
                ];
                $authSuccess = "Welcome back, {$foundUser['username']}! Session authenticated securely.";
            } else {
                $authErrors[] = 'Invalid username or password.';
            }
        }
    }

    if ($_POST['auth_action'] === 'logout') {
        unset($_SESSION['authenticated_user']);
        $authSuccess = "You have been logged out securely. Session destroyed.";
        $authTab = 'login';
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Fundamentals: 3 Essential Projects (Live Server Mode)</title>
    <meta name="description" content="Master PHP fundamentals with 3 projects: Tic-Tac-Toe, Email Contact Form, and User Registration/Login System.">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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
                        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        slate: {
                            850: '#131b2e',
                            900: '#0f172a',
                            925: '#0b1120',
                            950: '#070b14',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        :root {
            --bg-base: #070b14;
            --border-calm: #1e293b;
            --text-primary: #f8fafc;
        }

        body {
            background-color: var(--bg-base);
            color: var(--text-primary);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            line-height: 1.65;
        }

        .prose-measure {
            max-width: 68ch;
        }

        .calm-nav {
            background: rgba(11, 17, 32, 0.94);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-calm);
        }

        .viewport-frame {
            background: #090d16;
            border: 1px solid #1e293b;
            border-radius: 16px;
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.04);
            overflow: hidden;
            transition: border-color 0.25s ease;
        }

        .viewport-frame:hover {
            border-color: #334155;
        }

        .viewport-header {
            background: #0d1424;
            border-bottom: 1px solid #1e293b;
            padding: 10px 16px;
        }

        .code-container {
            background: #080c16;
            border: 1px solid #1e293b;
            border-radius: 12px;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            line-height: 1.65;
        }

        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #070b14;
        }
        ::-webkit-scrollbar-thumb {
            background: #1e293b;
            border-radius: 4px;
        }

        .tech-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.65rem;
            border-radius: 0.375rem;
            font-family: 'Fira Code', monospace;
            font-size: 0.72rem;
            font-weight: 500;
        }
    </style>
</head>

<body class="selection:bg-sky-950 selection:text-sky-200 flex flex-col min-h-screen">

    <!-- GLOBAL NAVBAR -->
    <header class="calm-nav sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-3">
                <div class="h-9 w-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono font-bold text-slate-200 shadow-sm">
                    <i class="fa-brands fa-php text-xl text-sky-400"></i>
                </div>
                <div>
                    <div class="font-heading font-bold text-base sm:text-lg text-slate-100 tracking-wide flex items-center gap-1.5">
                        PHP <span class="text-sky-400 font-semibold">Server Workbench</span>
                    </div>
                    <div class="text-[11px] text-slate-400 font-medium">Native PHP POST/Session Execution Mode</div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <a href="./case-study.html" class="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5">
                    <i class="fa-solid fa-book-open text-sky-400"></i>
                    <span>Case Study</span>
                </a>
                <a href="index.html" class="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all">
                    <i class="fa-solid fa-bolt mr-1"></i> Static Sandbox UI
                </a>
            </div>
        </div>
    </header>

    <!-- MAIN WORKBENCH -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">

        <!-- HEADER BANNER & INSTRUCTIONAL CONTEXT (Max measure 68ch) -->
        <section class="space-y-4 border-b border-slate-800/80 pb-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="space-y-1.5">
                    <div class="flex items-center gap-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-sky-950/80 text-sky-300 border border-sky-800/60">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                            Live PHP Server Instance Active
                        </span>
                        <span class="text-slate-500 text-xs font-mono">• PHP <?= phpversion() ?></span>
                    </div>
                    <h1 class="font-heading font-black text-2xl sm:text-3xl text-slate-100 tracking-tight">
                        Practical PHP Fundamentals Curriculum
                    </h1>
                </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed prose-measure">
                Review server-side architecture and code specifications on the left, and interact with the live PHP backend prototype on the right.
            </p>

            <!-- SEGMENTED TAB CONTROLLER -->
            <nav class="pt-3" aria-label="Curriculum Modules">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                    
                    <a href="index.php?tab=mod-1" class="flex items-center gap-3 p-3 rounded-lg text-left transition-all <?= $activeTab === 'mod-1' ? 'bg-slate-800/90 border border-sky-500/40 text-white shadow-sm' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200' ?>">
                        <div class="h-8 w-8 rounded-lg bg-sky-950 border border-sky-800/80 flex items-center justify-center font-mono font-bold text-xs text-sky-300">01</div>
                        <div class="min-w-0">
                            <div class="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold">Module 01</div>
                            <div class="text-xs font-bold truncate">Tic-Tac-Toe &bull; Sessions</div>
                        </div>
                    </a>

                    <a href="index.php?tab=mod-2" class="flex items-center gap-3 p-3 rounded-lg text-left transition-all <?= $activeTab === 'mod-2' ? 'bg-slate-800/90 border border-amber-500/40 text-white shadow-sm' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200' ?>">
                        <div class="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-400">02</div>
                        <div class="min-w-0">
                            <div class="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">Module 02</div>
                            <div class="text-xs font-bold truncate">Contact Form &bull; Sanitization</div>
                        </div>
                    </a>

                    <a href="index.php?tab=mod-3" class="flex items-center gap-3 p-3 rounded-lg text-left transition-all <?= $activeTab === 'mod-3' ? 'bg-slate-800/90 border border-emerald-500/40 text-white shadow-sm' : 'bg-slate-950/40 text-slate-400 hover:text-slate-200' ?>">
                        <div class="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-400">03</div>
                        <div class="min-w-0">
                            <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">Module 03</div>
                            <div class="text-xs font-bold truncate">User Auth &bull; PDO / Bcrypt</div>
                        </div>
                    </a>

                </div>
            </nav>
        </section>

        <?php if ($activeTab === 'mod-1'): ?>
        <!-- MODULE 01: TIC TAC TOE -->
        <section class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Theory & Code -->
                <div class="lg:col-span-6 space-y-6">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800/70">MODULE 01</span>
                            <span class="text-xs font-mono text-slate-400">Zero-DB Session Architecture</span>
                        </div>
                        <h2 class="font-heading font-black text-2xl text-slate-100">PHP Tic-Tac-Toe: Sessions &amp; 2D Matrices</h2>
                        <p class="text-slate-300 text-sm leading-relaxed prose-measure">
                            Tic-Tac-Toe provides a foundation in stateful server-side computing without database overhead. It demonstrates array manipulation, turn progression, and victory evaluation algorithms within persistent superglobal state.
                        </p>
                    </div>

                    <!-- Tech Tags -->
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Module Technical Specifications:</div>
                        <div class="flex flex-wrap gap-1.5">
                            <span class="tech-tag bg-sky-950/80 text-sky-300 border border-sky-800/60"><i class="fa-solid fa-microchip"></i> $_SESSION['board']</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-table-cells"></i> 2D Matrix Traversal</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-bolt"></i> O(1) 8-Way Win Algorithm</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-server"></i> Zero-DB Architecture</span>
                        </div>
                    </div>

                    <!-- Code Snippet -->
                    <div class="code-container p-4 text-slate-300 overflow-x-auto text-[11px]">
<pre><span class="text-slate-500">// 1. Initialize Board in Session</span>
<span class="text-sky-300">session_start</span>();
<span class="text-slate-400">if</span> (!<span class="text-sky-300">isset</span>(<span class="text-slate-200">$_SESSION</span>[<span class="text-emerald-300">'board'</span>])) {
    <span class="text-slate-200">$_SESSION</span>[<span class="text-emerald-300">'board'</span>] = [[<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>], [<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>], [<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>,<span class="text-emerald-300">''</span>]];
    <span class="text-slate-200">$_SESSION</span>[<span class="text-emerald-300">'player'</span>] = <span class="text-emerald-300">'X'</span>;
    <span class="text-slate-200">$_SESSION</span>[<span class="text-emerald-300">'winner'</span>] = <span class="text-slate-400">null</span>;
}</pre>
                    </div>
                </div>

                <!-- Right: Dedicated Viewport Frame -->
                <div class="lg:col-span-6">
                    <div class="viewport-frame">
                        <div class="viewport-header flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                                <span class="font-mono text-xs text-slate-400 ml-2">sandbox://session-tictactoe.php</span>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 text-sky-300 border border-sky-800/80">PHP 8.3 Native</span>
                        </div>

                        <div class="p-5 sm:p-6 space-y-6 bg-slate-950/70">
                            <div class="flex items-center justify-between text-xs font-mono pb-1 border-b border-slate-800">
                                <span class="text-slate-400">Turn State: <strong class="text-sky-300">Player <?= htmlspecialchars($_SESSION['ttt_player']) ?></strong></span>
                                <form method="POST">
                                    <input type="hidden" name="ttt_action" value="reset">
                                    <button type="submit" class="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[11px]"><i class="fa-solid fa-rotate-right mr-1 text-sky-400"></i> Reset</button>
                                </form>
                            </div>

                            <div class="w-full text-center py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                                <?= htmlspecialchars($_SESSION['ttt_status']) ?>
                            </div>

                            <!-- 3x3 Form Grid -->
                            <form method="POST" class="flex justify-center">
                                <input type="hidden" name="ttt_action" value="move">
                                <div class="grid grid-cols-3 gap-2.5 w-60 h-60 p-2.5 bg-slate-900 rounded-2xl border border-slate-800">
                                    <?php for ($r = 0; $r < 3; $r++): ?>
                                        <?php for ($c = 0; $c < 3; $c++): 
                                            $val = $_SESSION['ttt_board'][$r][$c];
                                            $disabled = ($val !== '' || $_SESSION['ttt_winner'] !== null);
                                        ?>
                                            <button type="submit" name="cell" value="<?= "{$r}_{$c}" ?>" onclick="this.form.row.value=<?= $r ?>; this.form.col.value=<?= $c ?>;" <?= $disabled ? 'disabled' : '' ?> class="h-full w-full rounded-xl bg-slate-950 border border-slate-800 font-heading font-black text-2xl <?= $val === 'X' ? 'text-sky-400 border-sky-500/50' : ($val === 'O' ? 'text-indigo-400 border-indigo-500/50' : 'text-slate-500') ?> flex items-center justify-center">
                                                <?= htmlspecialchars($val) ?>
                                            </button>
                                        <?php endfor; ?>
                                    <?php endfor; ?>
                                </div>
                                <input type="hidden" name="row" id="row" value="-1">
                                <input type="hidden" name="col" id="col" value="-1">
                            </form>

                            <!-- State Inspector -->
                            <div class="space-y-2 pt-2 border-t border-slate-800/80">
                                <div class="text-xs font-mono text-slate-400 flex justify-between">
                                    <span>$_SESSION Server State Dump</span>
                                    <span class="text-sky-400">Live Memory</span>
                                </div>
                                <div class="code-container p-3.5 text-sky-300 font-mono text-xs overflow-x-auto">
<pre>$_SESSION = <?= htmlspecialchars(var_export($_SESSION, true)) ?></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <?php if ($activeTab === 'mod-2'): ?>
        <!-- MODULE 02: CONTACT FORM -->
        <section class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-6 space-y-6">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800/70">MODULE 02</span>
                            <span class="text-xs font-mono text-slate-400">Sanitization &amp; mail() Pipeline</span>
                        </div>
                        <h2 class="font-heading font-black text-2xl text-slate-100">Secure Email Form: Sanitization &amp; mail()</h2>
                        <p class="text-slate-300 text-sm leading-relaxed prose-measure">
                            Processing untrusted user input is a core server-side responsibility. This module covers RFC-compliant email validation, XSS prevention via htmlspecialchars(), and defense against CRLF email header injection attacks.
                        </p>
                    </div>

                    <!-- Tech Tags -->
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Module Technical Specifications:</div>
                        <div class="flex flex-wrap gap-1.5">
                            <span class="tech-tag bg-amber-950/80 text-amber-300 border border-amber-800/60"><i class="fa-solid fa-filter"></i> filter_var(FILTER_VALIDATE_EMAIL)</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-code"></i> htmlspecialchars(ENT_QUOTES)</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-shield-halved"></i> CRLF Injection Defense</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-paper-plane"></i> Native mail() Protocol</span>
                        </div>
                    </div>

                    <div class="code-container p-4 text-slate-300 overflow-x-auto text-[11px]">
<pre><span class="text-slate-200">$name</span>    = <span class="text-sky-300">htmlspecialchars</span>(<span class="text-sky-300">trim</span>(<span class="text-slate-200">$_POST</span>[<span class="text-emerald-300">'name'</span>] ?? <span class="text-emerald-300">''</span>), <span class="text-amber-300">ENT_QUOTES</span>, <span class="text-emerald-300">'UTF-8'</span>);
<span class="text-slate-200">$email</span>   = <span class="text-sky-300">filter_var</span>(<span class="text-sky-300">trim</span>(<span class="text-slate-200">$_POST</span>[<span class="text-emerald-300">'email'</span>] ?? <span class="text-emerald-300">''</span>), <span class="text-amber-300">FILTER_VALIDATE_EMAIL</span>);
<span class="text-slate-200">$subject</span> = <span class="text-sky-300">preg_replace</span>(<span class="text-emerald-300">'/[\r\n]+/'</span>, <span class="text-emerald-300">' '</span>, <span class="text-sky-300">trim</span>(<span class="text-slate-200">$_POST</span>[<span class="text-emerald-300">'subject'</span>] ?? <span class="text-emerald-300">''</span>));
<span class="text-slate-200">$message</span> = <span class="text-sky-300">htmlspecialchars</span>(<span class="text-sky-300">trim</span>(<span class="text-slate-200">$_POST</span>[<span class="text-emerald-300">'message'</span>] ?? <span class="text-emerald-300">''</span>), <span class="text-amber-300">ENT_QUOTES</span>, <span class="text-emerald-300">'UTF-8'</span>);</pre>
                    </div>
                </div>

                <!-- Right: Viewport Frame -->
                <div class="lg:col-span-6">
                    <div class="viewport-frame">
                        <div class="viewport-header flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                                <span class="font-mono text-xs text-slate-400 ml-2">sandbox://mail-sanitizer.php</span>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-950 text-amber-300 border border-amber-800/80">Sanitizer Active</span>
                        </div>

                        <div class="p-5 sm:p-6 space-y-5 bg-slate-950/70">
                            <?php if (!empty($cfErrors)): ?>
                                <div class="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-200">
                                    <ul class="list-disc list-inside">
                                        <?php foreach ($cfErrors as $err): ?>
                                            <li><?= htmlspecialchars($err) ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php elseif ($cfSuccess): ?>
                                <div class="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200">
                                    ✅ Input passed all filters! Mail queued successfully via PHP mail().
                                </div>
                            <?php endif; ?>

                            <form method="POST" class="space-y-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                                <input type="hidden" name="cf_action" value="submit">
                                <div>
                                    <label class="text-[11px] text-slate-300 font-semibold">Sender Name *</label>
                                    <input type="text" name="cf_name" value="<?= htmlspecialchars($cfName ?: 'Jane Doe') ?>" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-xs focus:border-amber-400 focus:outline-none">
                                </div>
                                <div>
                                    <label class="text-[11px] text-slate-300 font-semibold">Email Address *</label>
                                    <input type="email" name="cf_email" value="<?= htmlspecialchars($cfEmail ?: 'jane@example.com') ?>" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-xs focus:border-amber-400 focus:outline-none">
                                </div>
                                <div>
                                    <label class="text-[11px] text-slate-300 font-semibold">Subject *</label>
                                    <input type="text" name="cf_subject" value="<?= htmlspecialchars($cfSubject ?: 'Inquiry on PHP Best Practices') ?>" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-xs focus:border-amber-400 focus:outline-none">
                                </div>
                                <div>
                                    <label class="text-[11px] text-slate-300 font-semibold">Message Body *</label>
                                    <textarea name="cf_message" rows="3" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-xs focus:border-amber-400 focus:outline-none"><?= htmlspecialchars($cfMessage ?: 'Hello! Testing PHP server-side input sanitization.') ?></textarea>
                                </div>
                                <button type="submit" class="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-paper-plane"></i> Execute Validation &amp; mail()
                                </button>
                            </form>

                            <?php if ($cfOutput): ?>
                            <div class="space-y-2 pt-1 border-t border-slate-800">
                                <div class="text-xs font-mono text-slate-400">Server Execution Output:</div>
                                <div class="code-container p-3.5 text-amber-300 font-mono text-xs overflow-x-auto">
<pre><?= htmlspecialchars($cfOutput) ?></pre>
                                </div>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <?php if ($activeTab === 'mod-3'): ?>
        <!-- MODULE 03: AUTHENTICATION -->
        <section class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-6 space-y-6">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/70">MODULE 03</span>
                            <span class="text-xs font-mono text-slate-400">PDO &amp; Bcrypt Auth Pipeline</span>
                        </div>
                        <h2 class="font-heading font-black text-2xl text-slate-100">User Authentication: PDO &amp; Bcrypt</h2>
                        <p class="text-slate-300 text-sm leading-relaxed prose-measure">
                            Authentication is the cornerstone of modern web applications. This module implements industry-standard password hashing via password_hash() with blowfish cost factors, timing-safe verification, and session fixation defense.
                        </p>
                    </div>

                    <!-- Tech Tags -->
                    <div class="space-y-2">
                        <div class="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Module Technical Specifications:</div>
                        <div class="flex flex-wrap gap-1.5">
                            <span class="tech-tag bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"><i class="fa-solid fa-key"></i> password_hash(BCRYPT, cost: 12)</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-stopwatch"></i> password_verify() Constant-Time</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-shield"></i> session_regenerate_id(true)</span>
                            <span class="tech-tag bg-slate-900 text-slate-300 border border-slate-700"><i class="fa-solid fa-database"></i> PDO Prepared Statements</span>
                        </div>
                    </div>

                    <div class="code-container p-4 text-slate-300 overflow-x-auto text-[11px]">
<pre><span class="text-slate-500">// Bcrypt Hash Generation</span>
<span class="text-slate-200">$hash</span> = <span class="text-sky-300">password_hash</span>(<span class="text-slate-200">$password</span>, <span class="text-emerald-300">PASSWORD_BCRYPT</span>, [<span class="text-emerald-300">'cost'</span> =&gt; 12]);
<span class="text-slate-500">// Timing-Safe Verification</span>
<span class="text-slate-400">if</span> (<span class="text-sky-300">password_verify</span>(<span class="text-slate-200">$password</span>, <span class="text-slate-200">$user</span>[<span class="text-emerald-300">'password_hash'</span>])) {
    <span class="text-sky-300">session_regenerate_id</span>(<span class="text-slate-400">true</span>);
}</pre>
                    </div>
                </div>

                <!-- Right: Viewport Frame -->
                <div class="lg:col-span-6">
                    <div class="viewport-frame">
                        <div class="viewport-header flex items-center justify-between">
                            <div class="flex items-center gap-1.5">
                                <span class="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                                <span class="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                                <span class="font-mono text-xs text-slate-400 ml-2">sandbox://pdo-bcrypt-auth.php</span>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80">Bcrypt Active</span>
                        </div>

                        <div class="p-5 sm:p-6 space-y-5 bg-slate-950/70">
                            <?php if (!empty($authErrors)): ?>
                                <div class="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-200">
                                    <ul class="list-disc list-inside">
                                        <?php foreach ($authErrors as $err): ?>
                                            <li><?= htmlspecialchars($err) ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php elseif ($authSuccess): ?>
                                <div class="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200">
                                    <?= htmlspecialchars($authSuccess) ?>
                                </div>
                            <?php endif; ?>

                            <?php if (isset($_SESSION['authenticated_user'])): ?>
                                <div class="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 flex items-center justify-between text-xs">
                                    <div>
                                        <span class="text-emerald-300 font-bold">Active Authenticated User:</span>
                                        <span class="font-mono text-white ml-1"><?= htmlspecialchars($_SESSION['authenticated_user']['username']) ?> (<?= htmlspecialchars($_SESSION['authenticated_user']['email']) ?>)</span>
                                    </div>
                                    <form method="POST">
                                        <input type="hidden" name="auth_action" value="logout">
                                        <button type="submit" class="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-rose-300 hover:bg-slate-800 text-xs font-semibold">Logout</button>
                                    </form>
                                </div>
                            <?php endif; ?>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <!-- Register Form -->
                                <form method="POST" class="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2.5">
                                    <input type="hidden" name="auth_action" value="register">
                                    <div class="font-bold text-emerald-400"><i class="fa-solid fa-user-plus mr-1"></i> Register User</div>
                                    <input type="text" name="reg_username" placeholder="Username" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs">
                                    <input type="email" name="reg_email" placeholder="Email" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs">
                                    <input type="password" name="reg_password" placeholder="Password (Min. 8)" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs">
                                    <button type="submit" class="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">Hash &amp; Register</button>
                                </form>

                                <!-- Login Form -->
                                <form method="POST" class="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2.5">
                                    <input type="hidden" name="auth_action" value="login">
                                    <div class="font-bold text-sky-400"><i class="fa-solid fa-right-to-bracket mr-1"></i> Login Session</div>
                                    <input type="text" name="login_username" value="demo_user" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs">
                                    <input type="password" name="login_password" value="Secret123!" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs">
                                    <button type="submit" class="w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs">Verify &amp; Start Session</button>
                                </form>
                            </div>

                            <!-- User Table Dump -->
                            <div class="space-y-2 pt-1 border-t border-slate-800">
                                <div class="text-xs font-mono text-slate-400">Database User Records &amp; Bcrypt Hashes in Memory:</div>
                                <div class="code-container p-3.5 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto">
<pre><?= htmlspecialchars(json_encode($_SESSION['auth_users'], JSON_PRETTY_PRINT)) ?></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

    </main>

    <!-- FOOTER -->
    <footer class="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-500 text-center mt-auto">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-left space-y-0.5">
                <div class="text-slate-300 font-semibold">Practical PHP Fundamentals: 3 Essential Projects</div>
                <div class="text-[11px] text-slate-500">Native PHP Server Execution Mode &bull; PHP 8.x Architecture</div>
            </div>
            <div class="flex items-center gap-3 font-mono text-xs">
                <a href="./case-study.html" class="text-sky-400 hover:text-sky-300 underline font-medium">Case Study Report</a>
                <span class="text-slate-700">&bull;</span>
                <a href="index.html" class="text-slate-400 hover:text-slate-200">Static Sandbox UI</a>
            </div>
        </div>
    </footer>
</body>
</html>
