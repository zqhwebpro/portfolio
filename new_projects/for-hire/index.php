<?php
/**
 * ZQH Studio — Freelance Business Website Entrypoint
 * Supports PHP server hosting with static HTML fallback for GitHub Pages.
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'contact') {
    require __DIR__ . '/contact-process.php';
    exit;
}

// Serve the primary freelance application
readfile(__DIR__ . '/index.html');
exit;
