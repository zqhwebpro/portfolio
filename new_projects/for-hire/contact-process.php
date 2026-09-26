<?php
/**
 * ZQH Studio — Freelance Business Contact & Inquiry Processor
 * Handles incoming client project scopes and direct contact messages.
 */

header('Content-Type: application/json; charset=utf-8');

// Allow Cross-Origin if necessary for API consumers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Please use POST.']);
    exit;
}

// Read raw body if JSON, or standard POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Anti-spam honeypot
if (!empty($data['website_hp'])) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Inquiry received. Thank you!']);
    exit;
}

// Sanitize inputs
$name     = trim(filter_var($data['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$email    = trim(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL));
$phone    = trim(filter_var($data['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$service  = trim(filter_var($data['service'] ?? 'General Consultation', FILTER_SANITIZE_SPECIAL_CHARS));
$budget   = trim(filter_var($data['budget'] ?? 'Not Specified', FILTER_SANITIZE_SPECIAL_CHARS));
$timeline = trim(filter_var($data['timeline'] ?? 'Flexible', FILTER_SANITIZE_SPECIAL_CHARS));
$message  = trim(filter_var($data['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please provide your full name.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Please provide a brief project summary (at least 10 characters).';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Prepare payload record
$inquiry = [
    'timestamp' => date('Y-m-d H:i:s T'),
    'name'      => $name,
    'email'     => $email,
    'phone'     => $phone,
    'service'   => $service,
    'budget'    => $budget,
    'timeline'  => $timeline,
    'message'   => $message,
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
];

// In production, this can dispatch via mail() or SMTP
$to = 'zqhwebpro@gmail.com';
$subject = "New Freelance Project Inquiry: {$name} [{$service}]";
$emailBody = "New project lead received via ZQH Studio Freelance Portal:\n\n"
           . "Client Name: {$name}\n"
           . "Client Email: {$email}\n"
           . "Client Phone: {$phone}\n"
           . "Requested Service: {$service}\n"
           . "Target Budget: {$budget}\n"
           . "Estimated Timeline: {$timeline}\n\n"
           . "Project Description:\n{$message}\n\n"
           . "Submitted: {$inquiry['timestamp']}\n";

$headers = "From: inquiries@zqhwebpro.com\r\n"
         . "Reply-To: {$email}\r\n"
         . "X-Mailer: PHP/" . phpversion();

// Attempt dispatch if mail environment is configured
@mail($to, $subject, $emailBody, $headers);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your project inquiry has been received. Zach will review your scope and follow up within 24 business hours.',
    'inquiry_id' => 'ZQH-' . strtoupper(substr(md5(uniqid()), 0, 8))
]);
