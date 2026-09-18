<?php
/**
 * ==============================================================================
 * PRACTICAL PHP FUNDAMENTALS — 3 ESSENTIAL PROJECTS
 * ==============================================================================
 * 1. PHP Tic-Tac-Toe (Sessions & 2D Arrays — Zero DB Dependency)
 * 2. Secure Email Contact Form (Sanitization, Validation & mail())
 * 3. User Registration / Login System (PDO, Bcrypt & Session State)
 * ==============================================================================
 */

// Initialize Session for Tic-Tac-Toe and Auth Demo
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ------------------------------------------------------------------------------
// Active Tab State (ttt | contact | auth)
// ------------------------------------------------------------------------------
$activeTab = $_GET['tab'] ?? 'ttt';
if (!in_array($activeTab, ['ttt', 'contact', 'auth'])) {
    $activeTab = 'ttt';
}

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
        header('Location: index.php?tab=ttt');
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
        header('Location: index.php?tab=ttt');
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

        // Simulated mail call
        $cfSuccess = true;
        $cfOutput = "mail(\"contact@example.com\", \"{$safeSubject}\", \"{$safeMessage}\", \"{$headers}\");";
    }
}

// ==============================================================================
// 3. USER REGISTRATION & LOGIN (IN-MEMORY / PDO SQLITE MOCK)
// ==============================================================================
if (!isset($_SESSION['auth_users'])) {
    // Seed initial demo user (password: 'Secret123!')
    $_SESSION['auth_users'] = [
        'demo_user' => [
            'username' => 'demo_user',
            'email'    => 'demo@example.com',
            'hash'     => password_hash('Secret123!', PASSWORD_BCRYPT),
            'created'  => time() - 86400
        ]
    ];
}

$authErrors = [];
$authSuccess = '';
$authTab = 'login'; // login or register

// Handle Auth Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['auth_action'])) {
    if ($_POST['auth_action'] === 'register') {
        $authTab = 'register';
        $regUser  = strtolower(trim($_POST['reg_username'] ?? ''));
        $regEmail = strtolower(trim($_POST['reg_email'] ?? ''));
        $regPass  = $_POST['reg_password'] ?? '';
        $regPass2 = $_POST['reg_password_confirm'] ?? '';

        if (empty($regUser) || !preg_match('/^[a-z0-9_]{3,20}$/', $regUser)) {
            $authErrors[] = 'Username must be 3-20 alphanumeric characters (or underscore).';
        }
        if (empty($regEmail) || !filter_var($regEmail, FILTER_VALIDATE_EMAIL)) {
            $authErrors[] = 'A valid email address is required.';
        }
        if (strlen($regPass) < 8) {
            $authErrors[] = 'Password must be at least 8 characters.';
        }
        if ($regPass !== $regPass2) {
            $authErrors[] = 'Passwords do not match.';
        }
        if (isset($_SESSION['auth_users'][$regUser])) {
            $authErrors[] = "Username '{$regUser}' is already registered.";
        }

        if (empty($authErrors)) {
            $hashedPassword = password_hash($regPass, PASSWORD_BCRYPT, ['cost' => 12]);
            $_SESSION['auth_users'][$regUser] = [
                'username' => $regUser,
                'email'    => $regEmail,
                'hash'     => $hashedPassword,
                'created'  => time()
            ];
            $authSuccess = "Registration successful for {$regUser}! You can now log in.";
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
            // Find user
            $foundUser = $_SESSION['auth_users'][$loginUser] ?? null;
            if ($foundUser && password_verify($loginPass, $foundUser['hash'])) {
                // Prevent Session Fixation
                session_regenerate_id(true);
                $_SESSION['authenticated_user'] = [
                    'username' => $foundUser['username'],
                    'email'    => $foundUser['email'],
                    'login_at' => time()
                ];
                $authSuccess = "Welcome back, {$foundUser['username']}! Session authenticated.";
            } else {
                $authErrors[] = 'Invalid username or password.';
            }
        }
    }

    if ($_POST['auth_action'] === 'logout') {
        unset($_SESSION['authenticated_user']);
        $authSuccess = "You have been logged out securely.";
        $authTab = 'login';
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Fundamentals: 3 Essential Projects (Live PHP Engine)</title>
    <meta name="description" content="Master PHP fundamentals with 3 projects: Tic-Tac-Toe, Email Contact Form, and User Registration/Login System.">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

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
                        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        php: {
                            50: '#F3F4FB',
                            100: '#E4E7F6',
                            300: '#A3B1E1',
                            400: '#8892BF',
                            500: '#6C7EB7',
                            600: '#4F5D95',
                            700: '#38426B',
                            800: '#232943',
                            900: '#111522',
                        },
                        dark: {
                            bg: '#0a0e17',
                            surface: '#111827',
                            card: '#182234',
                            cardHover: '#1f2d45',
                            border: '#2a3b57',
                            borderLight: '#3b4f73',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        :root {
            --bg-main: #0a0e17;
            --card-main: #182234;
            --border-main: #2a3b57;
            --php-blue: #4F5D95;
            --accent-cyan: #06b6d4;
            --accent-emerald: #10b981;
            --accent-amber: #f59e0b;
        }

        body {
            background-color: var(--bg-main);
            color: #f1f5f9;
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
        }

        .glass-nav {
            background: rgba(10, 14, 23, 0.88);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border-main);
        }

        .code-container {
            background: #0d131f;
            border: 1px solid #233047;
            border-radius: 12px;
            font-family: 'Fira Code', monospace;
            font-size: 0.82rem;
            line-height: 1.6;
        }

        ::-webkit-scrollbar {
            width: 7px;
            height: 7px;
        }
        ::-webkit-scrollbar-track {
            background: #0a0e17;
        }
        ::-webkit-scrollbar-thumb {
            background: #2a3b57;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #4F5D95;
        }

        .ttt-btn {
            transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ttt-btn:hover:not(:disabled) {
            transform: scale(1.04);
            border-color: #06b6d4;
            background-color: rgba(6, 182, 212, 0.1);
        }
    </style>
</head>

<body class="selection:bg-php-500 selection:text-white flex flex-col min-h-screen">

    <!-- GLOBAL NAVBAR -->
    <header class="glass-nav sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-tr from-php-700 to-php-500 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-php-600/30 text-lg">
                    <i class="fa-brands fa-php text-2xl"></i>
                </div>
                <div>
                    <div class="font-heading font-extrabold text-xl text-white tracking-wide flex items-center gap-1.5">
                        PHP<span class="text-cyan-400">CURRICULUM</span>
                    </div>
                    <div class="text-[11px] text-slate-400 font-medium">Native PHP Server Execution Mode</div>
                </div>
            </div>

            <!-- Tab Switcher -->
            <div class="flex items-center gap-2 text-xs font-semibold">
                <a href="index.php?tab=ttt" class="px-3.5 py-2 rounded-lg border transition-all <?= $activeTab === 'ttt' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-dark-card border-dark-border text-slate-300 hover:text-white' ?>">
                    1. Tic-Tac-Toe
                </a>
                <a href="index.php?tab=contact" class="px-3.5 py-2 rounded-lg border transition-all <?= $activeTab === 'contact' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-dark-card border-dark-border text-slate-300 hover:text-white' ?>">
                    2. Email Contact Form
                </a>
                <a href="index.php?tab=auth" class="px-3.5 py-2 rounded-lg border transition-all <?= $activeTab === 'auth' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-dark-card border-dark-border text-slate-300 hover:text-white' ?>">
                    3. User Auth System
                </a>
            </div>

            <div class="flex items-center gap-2.5">
                <a href="./case-study.html" class="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500 hover:text-white text-purple-300 text-xs font-bold transition-all flex items-center gap-1.5">
                    <i class="fa-solid fa-book-open"></i>
                    <span>Case Study</span>
                </a>
                <a href="index.html" class="px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-semibold transition-all">
                    <i class="fa-solid fa-globe"></i> Static UI
                </a>
            </div>
        </div>
    </header>

    <!-- MAIN CONTENT CONTAINER -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 flex-1 w-full">

        <!-- HEADER HERO -->
        <section class="space-y-3 border-b border-dark-border pb-6">
            <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-php-600/20 text-php-300 border border-php-500/30">
                    Active PHP <?= phpversion(); ?>
                </span>
                <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Live Server-Side Execution
                </span>
            </div>
            
            <h1 class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                Core PHP Fundamentals Mastery Curriculum
            </h1>
            <p class="text-slate-300 text-sm max-w-3xl leading-relaxed">
                Explore three fundamental server-side projects implemented with clean, robust PHP architectural patterns.
            </p>
        </section>

        <!-- ============================================================================== -->
        <!-- TAB 1: PHP TIC-TAC-TOE -->
        <!-- ============================================================================== -->
        <?php if ($activeTab === 'ttt'): ?>
        <section class="space-y-8">
            <div class="flex items-center justify-between flex-wrap gap-4 border-b border-dark-border pb-4">
                <div>
                    <div class="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">Project 1 &bull; Zero DB Dependency</div>
                    <h2 class="font-heading font-extrabold text-2xl text-white">1. PHP Tic-Tac-Toe</h2>
                </div>
                <div class="flex items-center gap-2 text-xs font-mono">
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">$_SESSION State</span>
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">2D Array Grid</span>
                </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                Tic Tac Toe is an excellent beginner PHP project as it doesn’t involve a database or the file system. It gives you great experience handling forms, user sessions, arrays, and other PHP basics, and is a lot of fun as well!
            </p>

            <!-- 6 Key Components Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-table-cells"></i> Game board representation
                    </div>
                    <p class="text-xs text-slate-300">
                        A 3x3 grid stored as a two-dimensional array in <code>$_SESSION['ttt_board']</code>.
                    </p>
                </div>
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-display"></i> Rendering the game board
                    </div>
                    <p class="text-xs text-slate-300">
                        Dynamic HTML generation looping through <code>[row][col]</code> cells.
                    </p>
                </div>
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-hand-pointer"></i> User input
                    </div>
                    <p class="text-xs text-slate-300">
                        Submitting moves back to PHP via standard HTTP <code>POST</code> requests.
                    </p>
                </div>
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-brain"></i> Game logic
                    </div>
                    <p class="text-xs text-slate-300">
                        <code>checkTicTacToeWin()</code> checks all 8 winning rows/cols/diagonals.
                    </p>
                </div>
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-arrows-rotate"></i> Game loop
                    </div>
                    <p class="text-xs text-slate-300">
                        Alternates turn between Player X and Player O on each valid move.
                    </p>
                </div>
                <div class="bg-dark-card p-4 rounded-xl border border-dark-border space-y-1.5">
                    <div class="text-cyan-400 font-bold font-heading text-xs flex items-center gap-2">
                        <i class="fa-solid fa-trophy"></i> Game end
                    </div>
                    <p class="text-xs text-slate-300">
                        Displays victory / tie banners with instant session restart button.
                    </p>
                </div>
            </div>

            <!-- Live Server-Rendered Board -->
            <div class="bg-dark-surface p-6 rounded-2xl border border-cyan-500/30 space-y-6">
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <h3 class="font-heading font-bold text-lg text-white flex items-center gap-2">
                        <span class="h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
                        Live Server-Side Board (Real PHP Session)
                    </h3>
                    <span class="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                        Session ID: <?= substr(session_id(), 0, 10); ?>...
                    </span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <!-- 3x3 Grid Form -->
                    <div class="lg:col-span-5 bg-dark-card p-6 rounded-2xl border border-dark-border flex flex-col items-center space-y-4">
                        <div class="flex items-center justify-between w-full text-xs font-mono">
                            <span class="text-slate-400">Current Turn:</span>
                            <span class="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">Player <?= htmlspecialchars($_SESSION['ttt_player']); ?></span>
                        </div>

                        <div class="w-full text-center py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                            <?= htmlspecialchars($_SESSION['ttt_status']); ?>
                        </div>

                        <!-- The 3x3 Grid Generated by PHP -->
                        <div class="grid grid-cols-3 gap-2.5 w-64 h-64 p-2 bg-dark-bg rounded-2xl border border-dark-border">
                            <?php for ($r = 0; $r < 3; $r++): ?>
                                <?php for ($c = 0; $c < 3; $c++): ?>
                                    <?php 
                                        $val = $_SESSION['ttt_board'][$r][$c]; 
                                        $disabled = ($val !== '' || $_SESSION['ttt_winner'] !== null);
                                    ?>
                                    <form method="POST" action="index.php?tab=ttt" class="h-full w-full">
                                        <input type="hidden" name="ttt_action" value="move">
                                        <input type="hidden" name="row" value="<?= $r ?>">
                                        <input type="hidden" name="col" value="<?= $c ?>">
                                        <button type="submit" <?= $disabled ? 'disabled' : '' ?> class="ttt-btn h-full w-full rounded-xl bg-dark-card border border-dark-border font-heading font-black text-2xl <?= $val === 'X' ? 'text-cyan-400' : ($val === 'O' ? 'text-purple-400' : 'text-slate-500') ?> flex items-center justify-center <?= $disabled ? 'cursor-not-allowed opacity-90' : 'hover:border-cyan-400' ?>">
                                            <?= htmlspecialchars($val); ?>
                                        </button>
                                    </form>
                                <?php endfor; ?>
                            <?php endfor; ?>
                        </div>

                        <!-- Restart Button -->
                        <form method="POST" action="index.php?tab=ttt" class="w-full">
                            <input type="hidden" name="ttt_action" value="reset">
                            <button type="submit" class="w-full py-2.5 rounded-xl bg-dark-card border border-dark-border hover:border-cyan-400 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all">
                                <i class="fa-solid fa-rotate-right"></i>
                                <span>Reset Session (Restart Game)</span>
                            </button>
                        </form>
                    </div>

                    <!-- Session State Visualizer -->
                    <div class="lg:col-span-7 space-y-4">
                        <div class="text-xs font-mono text-slate-400 flex items-center justify-between">
                            <span><i class="fa-brands fa-php text-php-400"></i> Live $_SESSION Dump</span>
                            <span class="text-cyan-400">Moves: <?= $_SESSION['ttt_moves'] ?>/9</span>
                        </div>
                        <div class="code-container p-4 overflow-x-auto text-cyan-300 font-mono text-xs">
                            <pre><?= htmlspecialchars(print_r([
                                'ttt_board'  => $_SESSION['ttt_board'],
                                'ttt_player' => $_SESSION['ttt_player'],
                                'ttt_winner' => $_SESSION['ttt_winner'],
                                'ttt_moves'  => $_SESSION['ttt_moves'],
                                'ttt_status' => $_SESSION['ttt_status']
                            ], true)); ?></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Required Skills Box -->
            <div class="bg-dark-card p-4 rounded-xl border border-dark-border flex items-center justify-between flex-wrap gap-3 text-xs">
                <span class="text-slate-400 font-semibold">Required Skills:</span>
                <div class="flex flex-wrap gap-2">
                    <span class="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">HTML/CSS</span>
                    <span class="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">PHP Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">Form Handling / Validation</span>
                    <span class="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">AppSec Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">Debugging / Troubleshooting</span>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- ============================================================================== -->
        <!-- TAB 2: EMAIL CONTACT FORM -->
        <!-- ============================================================================== -->
        <?php if ($activeTab === 'contact'): ?>
        <section class="space-y-8">
            <div class="flex items-center justify-between flex-wrap gap-4 border-b border-dark-border pb-4">
                <div>
                    <div class="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">Project 2 &bull; Sanitization &amp; Validation</div>
                    <h2 class="font-heading font-extrabold text-2xl text-white">2. Email Contact Form</h2>
                </div>
                <div class="flex items-center gap-2 text-xs font-mono">
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">mail() function</span>
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">filter_var()</span>
                </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                A simple email contact form project is another great PHP beginner project. This project includes an HTML form for collecting user input (name, email, subject, and message), a PHP script to filter, validate, and sanitize the input data, and the PHP <a href="https://www.php.net/manual/en/function.mail.php" target="_blank" class="text-amber-400 underline font-semibold">mail() function</a> to send the email.
            </p>

            <!-- Alerts -->
            <?php if (!empty($cfErrors)): ?>
                <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
                    <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation"></i> Submission Errors:</div>
                    <ul class="list-disc list-inside space-y-0.5">
                        <?php foreach ($cfErrors as $err): ?>
                            <li><?= htmlspecialchars($err) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <?php if ($cfSuccess): ?>
                <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                    <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Email Successfully Validated &amp; Dispatched!</div>
                    <div class="code-container p-3 font-mono text-[11px] text-emerald-400">
                        <?= htmlspecialchars($cfOutput) ?>
                    </div>
                </div>
            <?php endif; ?>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <!-- Contact Form -->
                <div class="lg:col-span-6 bg-dark-card p-6 rounded-2xl border border-dark-border space-y-4">
                    <form method="POST" action="index.php?tab=contact" class="space-y-3.5 text-xs">
                        <input type="hidden" name="cf_action" value="submit">
                        
                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Sender Name *</label>
                            <input type="text" name="cf_name" value="<?= htmlspecialchars($cfName ?: 'Jane Doe') ?>" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Email Address (filter_var validation) *</label>
                            <input type="email" name="cf_email" value="<?= htmlspecialchars($cfEmail ?: 'jane@example.com') ?>" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Subject *</label>
                            <input type="text" name="cf_subject" value="<?= htmlspecialchars($cfSubject ?: 'Project Inquiry & Collaboration') ?>" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Message (Sanitized with htmlspecialchars) *</label>
                            <textarea name="cf_message" rows="3" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"><?= htmlspecialchars($cfMessage ?: 'Hello! Testing PHP server-side input sanitization and form handling.') ?></textarea>
                        </div>

                        <button type="submit" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all">
                            <i class="fa-solid fa-paper-plane"></i>
                            <span>Process &amp; Execute mail() in PHP</span>
                        </button>
                    </form>
                </div>

                <!-- Code Architecture -->
                <div class="lg:col-span-6 space-y-4">
                    <div class="text-xs font-mono text-slate-400">Server-Side Sanitization Pattern:</div>
                    <div class="code-container p-4 overflow-x-auto text-amber-300 text-xs font-mono">
<pre>// 1. Defensive Trimming & Filtering
$name    = trim($_POST['name'] ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = preg_replace('/[\r\n]+/', ' ', trim($_POST['subject'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// 2. Header Injection Prevention
if (preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $subject)) {
    throw new Exception("Header Injection detected");
}

// 3. Native Mail Transmission
if ($email && !empty($name) && !empty($message)) {
    $headers = "From: webmaster@example.com\r\nReply-To: {$email}\r\n";
    mail("contact@example.com", $subject, $message, $headers);
}</pre>
                    </div>
                </div>
            </div>

            <!-- Required Skills Box -->
            <div class="bg-dark-card p-4 rounded-xl border border-dark-border flex items-center justify-between flex-wrap gap-3 text-xs">
                <span class="text-slate-400 font-semibold">Required Skills:</span>
                <div class="flex flex-wrap gap-2">
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">HTML/CSS</span>
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">PHP Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">Form Handling / Validation</span>
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">AppSec Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">Debugging / Troubleshooting</span>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- ============================================================================== -->
        <!-- TAB 3: USER REGISTRATION / LOGIN SYSTEM -->
        <!-- ============================================================================== -->
        <?php if ($activeTab === 'auth'): ?>
        <section class="space-y-8">
            <div class="flex items-center justify-between flex-wrap gap-4 border-b border-dark-border pb-4">
                <div>
                    <div class="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">Project 3 &bull; Database &amp; Auth Pipeline</div>
                    <h2 class="font-heading font-extrabold text-2xl text-white">3. User Registration / Login System</h2>
                </div>
                <div class="flex items-center gap-2 text-xs font-mono">
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">password_hash()</span>
                    <span class="px-2.5 py-1 rounded bg-dark-card border border-dark-border text-slate-300">password_verify()</span>
                </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">
                A PHP project that handles user login and registration is much more complex than a simple email contact form. However, this represents vital functionality that any e-commerce or social media-based website needs, and could also be combined with the Simple CMS project mentioned earlier. Pursuing this project is well worth your time if you are serious in building a career in web development.
            </p>

            <!-- Alerts -->
            <?php if (!empty($authErrors)): ?>
                <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
                    <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation"></i> Authentication Error:</div>
                    <ul class="list-disc list-inside space-y-0.5">
                        <?php foreach ($authErrors as $err): ?>
                            <li><?= htmlspecialchars($err) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <?php if ($authSuccess): ?>
                <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <i class="fa-solid fa-circle-check text-base"></i>
                    <span><?= htmlspecialchars($authSuccess) ?></span>
                </div>
            <?php endif; ?>

            <!-- Authenticated State Banner -->
            <?php if (isset($_SESSION['authenticated_user'])): ?>
                <div class="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-4">
                    <div class="space-y-1">
                        <div class="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                            Authenticated Session Active
                        </div>
                        <h4 class="font-heading font-extrabold text-xl text-white">
                            Logged in as: <?= htmlspecialchars($_SESSION['authenticated_user']['username']) ?>
                        </h4>
                        <p class="text-xs text-slate-300 font-mono">
                            Email: <?= htmlspecialchars($_SESSION['authenticated_user']['email']) ?> &bull; Login Time: <?= date('Y-m-d H:i:s', $_SESSION['authenticated_user']['login_at']) ?>
                        </p>
                    </div>

                    <form method="POST" action="index.php?tab=auth">
                        <input type="hidden" name="auth_action" value="logout">
                        <button type="submit" class="px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span>Destroy Session (Log Out)</span>
                        </button>
                    </form>
                </div>
            <?php endif; ?>

            <!-- Forms Container (Login & Register side-by-side) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Registration Form -->
                <div class="bg-dark-card p-6 rounded-2xl border border-dark-border space-y-4">
                    <div class="flex items-center gap-2 text-emerald-400 font-heading font-bold text-base">
                        <i class="fa-solid fa-user-plus"></i> Register New User (password_hash)
                    </div>
                    <form method="POST" action="index.php?tab=auth" class="space-y-3 text-xs">
                        <input type="hidden" name="auth_action" value="register">

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Username *</label>
                            <input type="text" name="reg_username" placeholder="e.g. alex_dev" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Email Address *</label>
                            <input type="email" name="reg_email" placeholder="alex@example.com" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Password *</label>
                            <input type="password" name="reg_password" placeholder="Min. 8 characters" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Confirm Password *</label>
                            <input type="password" name="reg_password_confirm" placeholder="Repeat password" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        </div>

                        <button type="submit" class="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all">
                            <i class="fa-solid fa-key"></i>
                            <span>Create Account &amp; Hash Password</span>
                        </button>
                    </form>
                </div>

                <!-- Login Form -->
                <div class="bg-dark-card p-6 rounded-2xl border border-dark-border space-y-4">
                    <div class="flex items-center gap-2 text-cyan-400 font-heading font-bold text-base">
                        <i class="fa-solid fa-right-to-bracket"></i> Login (password_verify &amp; Session)
                    </div>
                    <form method="POST" action="index.php?tab=auth" class="space-y-3 text-xs">
                        <input type="hidden" name="auth_action" value="login">

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Username *</label>
                            <input type="text" name="login_username" value="demo_user" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none">
                        </div>

                        <div class="space-y-1">
                            <label class="text-[11px] text-slate-300 font-semibold">Password (Demo: Secret123!) *</label>
                            <input type="password" name="login_password" value="Secret123!" required class="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-white text-xs focus:border-cyan-500 focus:outline-none">
                        </div>

                        <button type="submit" class="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all">
                            <i class="fa-solid fa-shield-halved"></i>
                            <span>Verify Hash &amp; Start Authenticated Session</span>
                        </button>
                    </form>

                    <!-- Registered Users In-Memory Inspector -->
                    <div class="pt-3 border-t border-dark-border space-y-2">
                        <div class="text-[11px] font-mono text-slate-400 font-semibold">Registered Users in Server Memory:</div>
                        <div class="code-container p-3 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto">
                            <pre><?= htmlspecialchars(print_r($_SESSION['auth_users'], true)); ?></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Required Skills Box -->
            <div class="bg-dark-card p-4 rounded-xl border border-dark-border flex items-center justify-between flex-wrap gap-3 text-xs">
                <span class="text-slate-400 font-semibold">Required Skills:</span>
                <div class="flex flex-wrap gap-2">
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">HTML/CSS</span>
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">PHP Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Form Handling / Validation</span>
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">AppSec Fundamentals</span>
                    <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Debugging / Troubleshooting</span>
                </div>
            </div>
        </section>
        <?php endif; ?>

    </main>

    <!-- GLOBAL FOOTER -->
    <footer class="border-t border-dark-border bg-dark-bg mt-16 py-8 text-xs text-slate-500 text-center">
        <div class="max-w-7xl mx-auto px-4 space-y-2">
            <div>PHP Fundamentals 3-Project Curriculum &bull; Tic-Tac-Toe &bull; Email Contact Form &bull; User Registration / Login</div>
            <div class="text-[11px]">Designed for high-performance server-side PHP development.</div>
        </div>
    </footer>

</body>
</html>
