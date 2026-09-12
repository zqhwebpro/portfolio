<?php
/**
 * REST API Endpoint: /api/order.php
 * Provides JSON status, stage updates, and order resetting
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../classes/OrderRepository.php';
require_once __DIR__ . '/../classes/KitchenManager.php';

$repo = new OrderRepository();
$action = $_GET['action'] ?? $_POST['action'] ?? 'get';

if ($action === 'reset') {
    $order = $repo->resetOrder();
    echo json_encode([
        'success' => true,
        'message' => 'Order reset to initial state',
        'order' => $order->toArray()
    ]);
    exit;
}

if ($action === 'stage') {
    $stage = isset($_GET['stage']) ? (int)$_GET['stage'] : (isset($_POST['stage']) ? (int)$_POST['stage'] : 1);
    $order = $repo->getCurrentOrder();
    $stage = max(1, min(4, $stage));
    
    // Adjust target timestamp to match stage
    $nowMs = (int)(microtime(true) * 1000);
    if ($stage === 4) {
        $order->targetReadyAt = $nowMs; // Instant ready
    } else if ($stage === 3) {
        $order->targetReadyAt = $nowMs + (3 * 60 * 1000); // 3 mins remaining
    } else if ($stage === 2) {
        $order->targetReadyAt = $nowMs + (10 * 60 * 1000); // 10 mins remaining
    } else {
        $order->targetReadyAt = $nowMs + (18 * 60 * 1000); // 18 mins remaining
    }
    
    $order->currentStageId = $stage;
    $repo->save($order);

    echo json_encode([
        'success' => true,
        'message' => "Stage updated to {$stage}",
        'order' => $order->toArray()
    ]);
    exit;
}

// Default: GET current order state
$order = $repo->getCurrentOrder();
$currentStageId = KitchenManager::resolveStage($order, $KITCHEN_STAGES);

echo json_encode([
    'success' => true,
    'order' => $order->toArray(),
    'computed' => [
        'remainingMs' => $order->getRemainingMs(),
        'countdownFormatted' => KitchenManager::formatCountdown($order->getRemainingMs()),
        'progressRatio' => $order->getProgressRatio(),
        'currentStageId' => $currentStageId,
        'isReady' => ($currentStageId === 4 || $order->getRemainingMs() <= 0)
    ]
]);
