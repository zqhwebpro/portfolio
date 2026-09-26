<?php
/**
 * ZQH Studio — Freelance Business Website Entrypoint
 * Supports PHP server hosting with static HTML fallback for GitHub Pages.
 */

// Prevent server and browser caching of HTML during active development
header("Cache-Control: no-cache, no-store, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'contact') {
    require __DIR__ . '/contact-process.php';
    exit;
}

// Serve the primary freelance application with dynamic asset cache-busting
$html = file_get_contents(__DIR__ . '/index.html');
$styleMtime = file_exists(__DIR__ . '/style.css') ? filemtime(__DIR__ . '/style.css') : time();
$appMtime = file_exists(__DIR__ . '/app.js') ? filemtime(__DIR__ . '/app.js') : time();

// Ensure style.css and app.js always load with their latest modified timestamp
$html = preg_replace('/style\.css(\?v=[0-9]+)?/', 'style.css?v=' . $styleMtime, $html);
$html = preg_replace('/app\.js(\?v=[0-9]+)?/', 'app.js?v=' . $appMtime, $html);

echo $html;
exit;

