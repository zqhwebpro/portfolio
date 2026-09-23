<?php
/**
 * PHP SERVER WORKBENCH (6 Modules)
 * Futuristic Redesign with Horizontal Slider
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$activeModule = $_GET['mod'] ?? 'module-1';

// MODULE 1: TIC-TAC-TOE
function initTicTacToe(): void {
    $_SESSION['ttt_board'] = [['', '', ''],['', '', ''],['', '', '']];
    $_SESSION['ttt_player'] = 'X';
    $_SESSION['ttt_winner'] = null;
    $_SESSION['ttt_moves'] = 0;
    $_SESSION['ttt_status'] = 'Game in progress. Player X turn.';
}
if (!isset($_SESSION['ttt_board'])) initTicTacToe();

function checkTicTacToeWin(array $board, string $player): bool {
    for ($i = 0; $i < 3; $i++) {
        if ($board[$i][0] === $player && $board[$i][1] === $player && $board[$i][2] === $player) return true;
        if ($board[0][$i] === $player && $board[1][$i] === $player && $board[2][$i] === $player) return true;
    }
    if ($board[0][0] === $player && $board[1][1] === $player && $board[2][2] === $player) return true;
    if ($board[0][2] === $player && $board[1][1] === $player && $board[2][0] === $player) return true;
    return false;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ttt_action'])) {
    if ($_POST['ttt_action'] === 'reset') {
        initTicTacToe();
        header('Location: index.php#module-1');
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
                $_SESSION['ttt_status'] = "Victory! Player {$currentPlayer} wins the match!";
            } elseif ($_SESSION['ttt_moves'] >= 9) {
                $_SESSION['ttt_winner'] = 'TIE';
                $_SESSION['ttt_status'] = "Game Over! It's a draw/tie!";
            } else {
                $_SESSION['ttt_player'] = ($currentPlayer === 'X') ? 'O' : 'X';
                $_SESSION['ttt_status'] = "Move recorded. Player {$_SESSION['ttt_player']}'s turn.";
            }
        }
        header('Location: index.php#module-1');
        exit;
    }
}

// MODULE 2: CONTACT FORM
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

    if (empty($cfName)) $cfErrors[] = 'Sender Name is required.';
    elseif (strlen($cfName) < 2 || strlen($cfName) > 60) $cfErrors[] = 'Name must be 2-60 chars.';

    $sanitizedEmail = filter_var($cfEmail, FILTER_SANITIZE_EMAIL);
    if (empty($cfEmail)) $cfErrors[] = 'Email is required.';
    elseif (!filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) $cfErrors[] = 'Invalid email format.';

    if (preg_match('/[\r\n]/', $cfEmail) || preg_match('/[\r\n]/', $cfSubject)) $cfErrors[] = 'CRLF Header Injection detected.';
    if (empty($cfSubject)) $cfErrors[] = 'Subject is required.';
    if (empty($cfMessage)) $cfErrors[] = 'Message is required.';

    if (empty($cfErrors)) {
        $safeName    = htmlspecialchars($cfName, ENT_QUOTES, 'UTF-8');
        $safeSubject = preg_replace('/[\r\n]+/', ' ', $cfSubject);
        $safeMessage = htmlspecialchars($cfMessage, ENT_QUOTES, 'UTF-8');
        $headers = "From: webmaster@example.com\r\nReply-To: {$sanitizedEmail}\r\nContent-Type: text/plain; charset=UTF-8";
        $cfSuccess = true;
        $cfOutput = "mail(\"contact@example.com\", \"{$safeSubject}\", \"{$safeMessage}\", \"{$headers}\");\n// Mail queued for transport.";
    }
    // We don't redirect here so we can show output. We use JS later to scroll to module-2 if post was for it.
    $activeModule = 'module-2';
}

// MODULE 3: AUTHENTICATION
if (!isset($_SESSION['auth_users'])) {
    $_SESSION['auth_users'] = [
        'demo' => [
            'id' => 1, 'username' => 'demo', 'email' => 'demo@example.com',
            'hash' => password_hash('password123', PASSWORD_BCRYPT, ['cost' => 12])
        ]
    ];
}

$authErrors = [];
$authSuccess = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['auth_action'])) {
    $activeModule = 'module-3';
    if ($_POST['auth_action'] === 'register') {
        $regUser = strtolower(trim($_POST['reg_username'] ?? ''));
        $regEmail = strtolower(trim($_POST['reg_email'] ?? ''));
        $regPass = $_POST['reg_password'] ?? '';
        
        if (empty($regUser)) $authErrors[] = 'Username required.';
        if (empty($regEmail) || !filter_var($regEmail, FILTER_VALIDATE_EMAIL)) $authErrors[] = 'Valid email required.';
        if (strlen($regPass) < 8) $authErrors[] = 'Password min 8 chars.';
        if (isset($_SESSION['auth_users'][$regUser])) $authErrors[] = 'Username taken.';
        
        if (empty($authErrors)) {
            $_SESSION['auth_users'][$regUser] = [
                'id' => count($_SESSION['auth_users']) + 1,
                'username' => $regUser,
                'email' => $regEmail,
                'hash' => password_hash($regPass, PASSWORD_BCRYPT, ['cost' => 12])
            ];
            $authSuccess = "Registered {$regUser}. You can now login.";
        }
    } elseif ($_POST['auth_action'] === 'login') {
        $loginUser = strtolower(trim($_POST['login_username'] ?? ''));
        $loginPass = $_POST['login_password'] ?? '';
        $user = $_SESSION['auth_users'][$loginUser] ?? null;
        if ($user && password_verify($loginPass, $user['hash'])) {
            session_regenerate_id(true);
            $_SESSION['authenticated_user'] = ['id' => $user['id'], 'username' => $user['username']];
            $authSuccess = "Welcome, {$user['username']}!";
        } else {
            $authErrors[] = 'Invalid credentials.';
        }
    } elseif ($_POST['auth_action'] === 'logout') {
        unset($_SESSION['authenticated_user']);
        $authSuccess = "Logged out securely.";
    }
}

// MODULE 4: FILE UPLOAD
$uploadErrors = [];
$uploadSuccess = '';
$uploadedFileMeta = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload_action'])) {
    $activeModule = 'module-4';
    if (isset($_FILES['file_input'])) {
        $file = $_FILES['file_input'];
        $allowedMimes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $uploadErrors[] = "Upload error code: " . $file['error'];
        } else {
            if ($file['size'] > 2 * 1024 * 1024) { // 2MB
                $uploadErrors[] = "File exceeds 2MB limit.";
            }
            if (!in_array($file['type'], $allowedMimes)) {
                $uploadErrors[] = "Invalid file type: " . $file['type'] . ". Allowed: jpg, png, pdf, txt.";
            }
        }
        
        if (empty($uploadErrors)) {
            // Mocking the move_uploaded_file success
            $uploadSuccess = "File '{$file['name']}' securely validated and accepted.";
            $uploadedFileMeta = [
                'name' => htmlspecialchars($file['name']),
                'type' => htmlspecialchars($file['type']),
                'size' => round($file['size'] / 1024, 2) . ' KB',
                'tmp_name' => $file['tmp_name']
            ];
        }
    }
}

// MODULE 5: SHOPPING CART
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = []; // e.g. [ 'item_1' => ['name'=>'Laptop', 'price'=>999.99, 'qty'=>1] ]
}
$products = [
    'p1' => ['id' => 'p1', 'name' => 'Quantum CPU', 'price' => 499.00],
    'p2' => ['id' => 'p2', 'name' => 'Neural GPU', 'price' => 899.00],
    'p3' => ['id' => 'p3', 'name' => 'Holo RAM 32GB', 'price' => 150.00]
];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cart_action'])) {
    $activeModule = 'module-5';
    if ($_POST['cart_action'] === 'add') {
        $pid = $_POST['product_id'] ?? '';
        if (isset($products[$pid])) {
            if (isset($_SESSION['cart'][$pid])) {
                $_SESSION['cart'][$pid]['qty']++;
            } else {
                $_SESSION['cart'][$pid] = $products[$pid];
                $_SESSION['cart'][$pid]['qty'] = 1;
            }
        }
    } elseif ($_POST['cart_action'] === 'remove') {
        $pid = $_POST['product_id'] ?? '';
        if (isset($_SESSION['cart'][$pid])) {
            if ($_SESSION['cart'][$pid]['qty'] > 1) {
                $_SESSION['cart'][$pid]['qty']--;
            } else {
                unset($_SESSION['cart'][$pid]);
            }
        }
    } elseif ($_POST['cart_action'] === 'clear') {
        $_SESSION['cart'] = [];
    }
}
$cartTotal = array_reduce($_SESSION['cart'], function($sum, $item) {
    return $sum + ($item['price'] * $item['qty']);
}, 0);

// MODULE 6: REST API MOCK
$apiResponse = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['api_action'])) {
    $activeModule = 'module-6';
    $resource = trim($_POST['api_resource'] ?? '');
    
    // Instead of actually sending JSON headers (which would break HTML rendering),
    // we simulate the JSON response inside the HTML UI for demonstration.
    $status = 200;
    
    if ($resource === 'users') {
        $data = array_values(array_map(function($u) {
            return ['id'=>$u['id'], 'username'=>$u['username']];
        }, $_SESSION['auth_users']));
        $apiResponse = ['status' => 'success', 'data' => $data];
    } elseif ($resource === 'products') {
        $apiResponse = ['status' => 'success', 'data' => array_values($products)];
    } elseif ($resource === 'cart') {
        $apiResponse = ['status' => 'success', 'data' => array_values($_SESSION['cart']), 'total' => $cartTotal];
    } else {
        $status = 404;
        $apiResponse = ['status' => 'error', 'message' => 'Resource not found. Try users, products, or cart.'];
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zach Heindel | PHP Delivery — Real-Time Logistics & Route Management Platform</title>
    <meta name="description" content="Full-stack PHP and MySQL logistics management application featuring real-time dispatch tracking, route optimization, and session state engines." />
    <meta name="keywords" content="PHP Delivery Platform, Logistics Management, MySQL Database, Real-Time Dispatch, Route Tracking, PHP Web App, Zach Heindel" />
    <meta name="author" content="Zach Heindel" />

    <!-- Open Graph / Social SEO -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="PHP Delivery — Real-Time Logistics & Route Management Platform" />
    <meta property="og:description" content="Full-stack PHP and MySQL logistics management application featuring real-time dispatch tracking and route optimization." />
    <meta property="og:url" content="https://zqhwebpro.github.io/portfolio/new_projects/php-delivery/" />
    <meta property="og:site_name" content="ZQH.WEBPRO" />

    <!-- JSON-LD AI SEO Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PHP Delivery Platform",
      "applicationCategory": "LogisticsApplication",
      "operatingSystem": "Web Browser",
      "description": "Full-stack PHP & MySQL logistics dashboard for real-time dispatch tracking, order management, and route optimization.",
      "url": "https://zqhwebpro.github.io/portfolio/new_projects/php-delivery/",
      "author": {
        "@type": "Person",
        "name": "Zach Heindel"
      },
      "programmingLanguage": ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"]
    }
    </script>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['"Fira Code"', 'monospace'] },
                    colors: {
                        slate: { 850: '#151e32', 900: '#0f172a', 950: '#0b1121' },
                        digital: { green: '#10b981', mint: '#6ee7b7', blue: '#0ea5e9' }
                    }
                }
            }
        }
    </script>
    <style>
        body { background: #070f1a; color: #e2e8f0; font-family: 'Inter', sans-serif; margin: 0; overflow: hidden; }
        
        /* Glassmorphism & Satin Finish */
        .glass {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .glow-accent {
            position: absolute;
            width: 300px; height: 300px;
            background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        }
        
        .glow-blue { background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%); }
        .glow-purple { background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%); }
        .glow-amber { background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0) 70%); }
        .glow-pink { background: radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%); }
        
        /* Input & Button Styling */
        input, textarea, select {
            background: rgba(11, 17, 33, 0.8);
            border: 1px solid rgba(255,255,255,0.1);
            color: #f8fafc;
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            transition: all 0.3s ease;
        }
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 10px rgba(16,185,129,0.3);
        }
        
        .btn-sleek {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border: 1px solid rgba(255,255,255,0.1);
            color: #6ee7b7;
            border-radius: 8px;
            padding: 0.5rem 1.2rem;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
        }
        .btn-sleek:hover {
            border-color: #10b981;
            color: #10b981;
            box-shadow: 0 0 15px rgba(16,185,129,0.2);
        }

        /* Horizontal Scroll Snap Slider */
        .slider-container {
            display: flex;
            width: 100vw;
            height: 100vh;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
        }
        
        .slider-container::-webkit-scrollbar { display: none; }
        .slider-container { -ms-overflow-style: none; scrollbar-width: none; }
        
        .module-slide {
            flex: 0 0 100vw;
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 2rem;
        }
        
        /* Module Inner Container */
        .module-content {
            width: 100%;
            max-width: 1000px;
            height: 80vh;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
        }
        
        /* Code block */
        .code-block {
            background: #050b14;
            color: #8be9fd;
            font-family: 'Fira Code', monospace;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,0.05);
            font-size: 0.8rem;
            overflow-x: auto;
        }
        
        /* Global Nav */
        .fixed-nav {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            display: flex;
            gap: 1rem;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .nav-dot {
            width: 12px; height: 12px;
            border-radius: 50%;
            background: #334155;
            cursor: pointer;
            transition: all 0.3s;
        }
        .nav-dot.active { background: #10b981; box-shadow: 0 0 10px rgba(16,185,129,0.8); transform: scale(1.2); }
    </style>
</head>
<body data-active-mod="<?= htmlspecialchars($activeModule) ?>">

    <div class="slider-container" id="slider">
        <!-- Slide 1: Tic Tac Toe -->
        <div class="module-slide" id="module-1">
            <div class="glow-accent" style="top: 10%; left: 10%;"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-2">01. Session State</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Tic-Tac-Toe via 2D Arrays stored in $_SESSION. No database required. Constant time win checking algorithm.</p>
                    <div class="code-block mb-4">
$_SESSION['board'] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col items-center justify-center relative">
                    <div class="text-sm font-mono text-emerald-300 mb-4"><?= htmlspecialchars($_SESSION['ttt_status']) ?></div>
                    <form method="POST" action="#module-1">
                        <input type="hidden" name="ttt_action" value="move">
                        <div class="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                            <?php for($r=0; $r<3; $r++): for($c=0; $c<3; $c++):
                                $val = $_SESSION['ttt_board'][$r][$c];
                                $disabled = ($val !== '' || $_SESSION['ttt_winner'] !== null);
                            ?>
                                <button type="submit" name="cell" onclick="this.form.row.value=<?= $r ?>; this.form.col.value=<?= $c ?>;" <?= $disabled ? 'disabled' : '' ?>
                                    class="w-20 h-20 text-3xl font-bold rounded-lg border border-slate-800 <?= $val === 'X' ? 'text-sky-400 bg-slate-900' : ($val === 'O' ? 'text-emerald-400 bg-slate-900' : 'bg-slate-900/50 hover:bg-slate-800') ?>">
                                    <?= htmlspecialchars($val) ?>
                                </button>
                            <?php endfor; endfor; ?>
                        </div>
                        <input type="hidden" name="row" id="row" value="-1">
                        <input type="hidden" name="col" id="col" value="-1">
                    </form>
                    <form method="POST" action="#module-1" class="mt-6">
                        <input type="hidden" name="ttt_action" value="reset">
                        <button class="btn-sleek">Reset Game</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Slide 2: Contact Form -->
        <div class="module-slide" id="module-2">
            <div class="glow-accent glow-blue" style="bottom: 10%; right: 10%;"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-2">02. Sanitization</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Secure data intake pipeline. Prevents XSS and CRLF Header Injection using robust filtering before invoking mail().</p>
                    <div class="code-block mb-4">
$safe = htmlspecialchars($input, ENT_QUOTES);
$email = filter_var($e, FILTER_SANITIZE_EMAIL);
// Strip newlines from headers
preg_replace('/[\r\n]+/', '', $subj);
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center relative overflow-y-auto">
                    <?php if(!empty($cfErrors)): ?>
                        <div class="text-rose-400 text-xs mb-4 bg-rose-950/50 border border-rose-900/50 p-3 rounded"><?= implode('<br>', $cfErrors) ?></div>
                    <?php endif; if($cfSuccess): ?>
                        <div class="text-emerald-400 text-xs mb-4 bg-emerald-950/50 border border-emerald-900/50 p-3 rounded">Secure processing complete. Output below.</div>
                    <?php endif; ?>
                    <form method="POST" action="#module-2" class="space-y-4">
                        <input type="hidden" name="cf_action" value="submit">
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" name="cf_name" placeholder="Name" value="<?= htmlspecialchars($cfName) ?>" required>
                            <input type="email" name="cf_email" placeholder="Email" value="<?= htmlspecialchars($cfEmail) ?>" required>
                        </div>
                        <input type="text" name="cf_subject" placeholder="Subject" class="w-full" value="<?= htmlspecialchars($cfSubject) ?>" required>
                        <textarea name="cf_message" rows="3" placeholder="Message" class="w-full" required><?= htmlspecialchars($cfMessage) ?></textarea>
                        <button type="submit" class="btn-sleek w-full border-sky-500/30 text-sky-400 hover:text-sky-300">Process & Send</button>
                    </form>
                    <?php if($cfOutput): ?>
                        <div class="mt-4 code-block text-[10px] text-sky-200 bg-slate-950"><?= nl2br(htmlspecialchars($cfOutput)) ?></div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Slide 3: Auth -->
        <div class="module-slide" id="module-3">
            <div class="glow-accent" style="top: 20%; right: 20%;"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-500 mb-2">03. Bcrypt Auth</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Demonstrates secure password hashing and constant-time verification using PHP's native password_hash API.</p>
                    <div class="code-block mb-4">
$hash = password_hash($pwd, PASSWORD_BCRYPT);
if (password_verify($pwd, $hash)) {
  session_regenerate_id(true);
}
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center relative">
                    <?php if(!empty($authErrors)): ?>
                        <div class="text-rose-400 text-xs mb-4 bg-rose-950/50 p-2 rounded"><?= implode('<br>', $authErrors) ?></div>
                    <?php endif; if($authSuccess): ?>
                        <div class="text-emerald-400 text-xs mb-4 bg-emerald-950/50 p-2 rounded"><?= htmlspecialchars($authSuccess) ?></div>
                    <?php endif; ?>

                    <?php if (isset($_SESSION['authenticated_user'])): ?>
                        <div class="bg-slate-900/80 p-6 rounded-xl border border-emerald-500/30 text-center">
                            <div class="text-emerald-400 mb-2 font-mono text-sm">Authenticated as:</div>
                            <div class="text-xl font-bold text-white mb-6"><?= htmlspecialchars($_SESSION['authenticated_user']['username']) ?></div>
                            <form method="POST" action="#module-3">
                                <input type="hidden" name="auth_action" value="logout">
                                <button type="submit" class="btn-sleek w-full border-rose-500/30 text-rose-400 hover:text-rose-300">Terminate Session</button>
                            </form>
                        </div>
                    <?php else: ?>
                        <div class="grid grid-cols-1 gap-6">
                            <div class="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <h3 class="text-sm font-mono text-sky-400 mb-3">Login</h3>
                                <form method="POST" action="#module-3" class="flex gap-2">
                                    <input type="hidden" name="auth_action" value="login">
                                    <input type="text" name="login_username" placeholder="Username (demo)" class="w-1/3 text-xs" required>
                                    <input type="password" name="login_password" placeholder="Password (password123)" class="w-1/3 text-xs" required>
                                    <button type="submit" class="btn-sleek flex-1">Login</button>
                                </form>
                            </div>
                            <div class="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <h3 class="text-sm font-mono text-emerald-400 mb-3">Register</h3>
                                <form method="POST" action="#module-3" class="space-y-3">
                                    <input type="hidden" name="auth_action" value="register">
                                    <div class="flex gap-2">
                                        <input type="text" name="reg_username" placeholder="New User" class="flex-1 text-xs" required>
                                        <input type="email" name="reg_email" placeholder="Email" class="flex-1 text-xs" required>
                                    </div>
                                    <div class="flex gap-2">
                                        <input type="password" name="reg_password" placeholder="Pass (min 8)" class="flex-1 text-xs" required>
                                        <button type="submit" class="btn-sleek w-1/3">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Slide 4: File Upload -->
        <div class="module-slide" id="module-4">
            <div class="glow-accent glow-purple" style="bottom: 0; left: 0;"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">04. File Manager</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Secure file handling verifying MIME types and size constraints in the PHP `$_FILES` superglobal.</p>
                    <div class="code-block mb-4">
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $mime = $_FILES['file']['type'];
  if (in_array($mime, $allowedMimes)) {
    // move_uploaded_file(...)
  }
}
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center relative">
                    <?php if(!empty($uploadErrors)): ?>
                        <div class="text-rose-400 text-xs mb-4 bg-rose-950/50 p-2 rounded"><?= implode('<br>', $uploadErrors) ?></div>
                    <?php endif; if($uploadSuccess): ?>
                        <div class="text-emerald-400 text-xs mb-4 bg-emerald-950/50 p-2 rounded"><?= htmlspecialchars($uploadSuccess) ?></div>
                        <div class="text-[10px] font-mono bg-slate-950 p-3 rounded text-slate-300 mb-4">
                            Name: <?= $uploadedFileMeta['name'] ?><br>
                            Type: <?= $uploadedFileMeta['type'] ?><br>
                            Size: <?= $uploadedFileMeta['size'] ?><br>
                            Tmp : <?= $uploadedFileMeta['tmp_name'] ?>
                        </div>
                    <?php endif; ?>
                    
                    <form method="POST" action="#module-4" enctype="multipart/form-data" class="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 border-dashed text-center">
                        <input type="hidden" name="upload_action" value="upload">
                        <div class="text-4xl text-slate-500 mb-4"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                        <input type="file" name="file_input" class="w-full text-xs text-slate-400 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-900/50 file:text-indigo-300 hover:file:bg-indigo-900/80 cursor-pointer" required>
                        <p class="text-[10px] text-slate-500 mb-4">Max 2MB. Allowed: JPG, PNG, PDF, TXT.</p>
                        <button type="submit" class="btn-sleek border-indigo-500/30 text-indigo-400 hover:text-indigo-300 w-full">Upload Securely</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Slide 5: Shopping Cart -->
        <div class="module-slide" id="module-5">
            <div class="glow-accent glow-amber" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">05. Session Cart</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Stateful e-commerce cart using session arrays. Demonstrates data mutation, mapping, and reduction.</p>
                    <div class="code-block mb-4">
$total = array_reduce($_SESSION['cart'],
  fn($sum, $i) => $sum + ($i['price'] * $i['qty']), 0
);
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center relative text-sm">
                    <div class="mb-6 grid grid-cols-3 gap-3">
                        <?php foreach($products as $pid => $p): ?>
                        <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-center">
                            <div class="text-xs font-bold text-slate-200 truncate"><?= htmlspecialchars($p['name']) ?></div>
                            <div class="text-emerald-400 text-xs my-1">$<?= number_format($p['price'], 2) ?></div>
                            <form method="POST" action="#module-5">
                                <input type="hidden" name="cart_action" value="add">
                                <input type="hidden" name="product_id" value="<?= $pid ?>">
                                <button type="submit" class="mt-2 text-[10px] bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 px-2 py-1 rounded w-full border border-amber-600/30 transition-colors">Add</button>
                            </form>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner flex-1 overflow-y-auto min-h-[200px]">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                            <h3 class="font-mono text-slate-300 text-xs">Your Cart</h3>
                            <div class="text-amber-400 font-bold">$<?= number_format($cartTotal, 2) ?></div>
                        </div>
                        <?php if(empty($_SESSION['cart'])): ?>
                            <div class="text-slate-600 text-xs italic text-center mt-8">Cart is empty</div>
                        <?php else: ?>
                            <ul class="space-y-2">
                                <?php foreach($_SESSION['cart'] as $pid => $item): ?>
                                <li class="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800">
                                    <div class="flex items-center gap-2">
                                        <span class="text-slate-300 font-semibold"><?= htmlspecialchars($item['name']) ?></span>
                                        <span class="text-slate-500">x<?= $item['qty'] ?></span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <span class="text-emerald-400">$<?= number_format($item['price'] * $item['qty'], 2) ?></span>
                                        <form method="POST" action="#module-5">
                                            <input type="hidden" name="cart_action" value="remove">
                                            <input type="hidden" name="product_id" value="<?= $pid ?>">
                                            <button type="submit" class="text-rose-400 hover:text-rose-300 font-mono text-[10px] bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-900/50">[-]</button>
                                        </form>
                                    </div>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                            <form method="POST" action="#module-5" class="mt-4 text-right">
                                <input type="hidden" name="cart_action" value="clear">
                                <button type="submit" class="text-[10px] text-slate-500 hover:text-rose-400 underline">Clear Cart</button>
                            </form>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 6: REST API Endpoint -->
        <div class="module-slide" id="module-6">
            <div class="glow-accent glow-pink" style="top: -10%; left: -10%;"></div>
            <div class="module-content glass flex flex-col md:flex-row shadow-2xl">
                <div class="p-8 md:w-1/2 border-r border-slate-700/50 flex flex-col justify-center">
                    <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-2">06. REST API</h2>
                    <p class="text-slate-400 mb-6 text-sm leading-relaxed">Emulates a stateless JSON API endpoint. Processes queries and returns structured data representation.</p>
                    <div class="code-block mb-4">
header('Content-Type: application/json');
echo json_encode([
  'status' => 'success',
  'data' => $payload
]);
                    </div>
                </div>
                <div class="p-8 md:w-1/2 flex flex-col justify-center relative">
                    <div class="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50 mb-6">
                        <h3 class="text-sm font-mono text-pink-400 mb-3">API Query Simulator</h3>
                        <form method="POST" action="#module-6" class="flex gap-2">
                            <input type="hidden" name="api_action" value="fetch">
                            <select name="api_resource" class="flex-1 text-xs" required>
                                <option value="users">GET /api/users</option>
                                <option value="products">GET /api/products</option>
                                <option value="cart">GET /api/cart</option>
                                <option value="invalid">GET /api/invalid_route</option>
                            </select>
                            <button type="submit" class="btn-sleek w-1/3 border-pink-500/30 text-pink-400 hover:text-pink-300">Execute</button>
                        </form>
                    </div>

                    <div class="flex-1 bg-[#050b14] rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                        <div class="bg-slate-900 px-4 py-2 border-b border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                            <span>Response</span>
                            <span class="<?= isset($apiResponse['status']) && $apiResponse['status'] === 'error' ? 'text-rose-400' : 'text-emerald-400' ?>"><?= $status ?? 200 ?> OK</span>
                        </div>
                        <div class="p-4 overflow-y-auto text-xs font-mono <?= isset($apiResponse['status']) && $apiResponse['status'] === 'error' ? 'text-rose-300' : 'text-emerald-300' ?> h-[200px]">
                            <?php if ($apiResponse): ?>
                                <pre><?= htmlspecialchars(json_encode($apiResponse, JSON_PRETTY_PRINT)) ?></pre>
                            <?php else: ?>
                                <span class="text-slate-600 italic">Waiting for request...</span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Dots -->
    <div class="fixed-nav" id="nav-dots">
        <a href="#module-1" class="nav-dot" data-target="module-1"></a>
        <a href="#module-2" class="nav-dot" data-target="module-2"></a>
        <a href="#module-3" class="nav-dot" data-target="module-3"></a>
        <a href="#module-4" class="nav-dot" data-target="module-4"></a>
        <a href="#module-5" class="nav-dot" data-target="module-5"></a>
        <a href="#module-6" class="nav-dot" data-target="module-6"></a>
    </div>

    <script>
        // Smooth snap navigation logic
        const slider = document.getElementById('slider');
        const dots = document.querySelectorAll('.nav-dot');
        const slides = document.querySelectorAll('.module-slide');

        // Observer to detect which slide is currently in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    dots.forEach(dot => {
                        dot.classList.toggle('active', dot.getAttribute('data-target') === id);
                    });
                }
            });
        }, {
            root: slider,
            threshold: 0.5
        });

        slides.forEach(slide => observer.observe(slide));

        // On load, handle active module from PHP state if no hash is present in URL
        document.addEventListener('DOMContentLoaded', () => {
            if (!window.location.hash) {
                const activeMod = document.body.getAttribute('data-active-mod');
                if (activeMod) {
                    window.location.hash = activeMod;
                }
            } else {
                // If there's a hash, ensure we scroll to it immediately (sometimes browsers get confused with scroll-snap)
                const target = document.querySelector(window.location.hash);
                if (target) {
                    target.scrollIntoView();
                }
            }
        });
    </script>
</body>
</html>
