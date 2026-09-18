<?php
/**
 * Order Repository with Immutable Timestamp Persistence & Multi-Option Kitchen Order Creation
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/Order.php';
require_once __DIR__ . '/KitchenManager.php';

class OrderRepository {
    private string $filePath;

    public function __construct(string $filePath = ORDERS_FILE) {
        $this->filePath = $filePath;
        $this->ensureDataDirectory();
    }

    private function ensureDataDirectory(): void {
        $dir = dirname($this->filePath);
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
    }

    /**
     * Retrieve the current active order, or initialize default if none exists
     */
    public function getCurrentOrder(): Order {
        if (file_exists($this->filePath)) {
            $json = @file_get_contents($this->filePath);
            if ($json) {
                $data = json_decode($json, true);
                if ($data && isset($data['placedAt'], $data['targetReadyAt'])) {
                    return new Order($data);
                }
            }
        }

        // Initialize fresh default order
        return $this->createOrderFromOption('option-soppressata', 'auto');
    }

    /**
     * Save an order to storage
     */
    public function save(Order $order): bool {
        $this->ensureDataDirectory();
        $json = json_encode($order->toArray(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        return (bool)@file_put_contents($this->filePath, $json, LOCK_EX);
    }

    /**
     * Create a brand-new order from one of the 5 menu cooking options
     */
    public function createOrderFromOption(string $optionId = 'option-soppressata', string $timeMode = 'auto', array $customerOverrides = []): Order {
        global $MENU_OPTIONS;

        if (!isset($MENU_OPTIONS[$optionId])) {
            $optionId = 'option-soppressata';
        }
        $opt = $MENU_OPTIONS[$optionId];

        $nowMs = (int)(microtime(true) * 1000);
        $surge = KitchenManager::resolveTimeOfDaySurge($nowMs, $timeMode);

        $baseCookMinutes = $opt['baseCookMinutes'];
        $adjMinutes = $surge['adjustmentMinutes'];
        $finalDurationMinutes = max(5, $baseCookMinutes + $adjMinutes);
        $totalDurationMs = $finalDurationMinutes * 60 * 1000;

        $placedAt = $nowMs;
        $targetReadyAt = $placedAt + $totalDurationMs;
        $placedAtFormatted = date('g:i A', (int)($placedAt / 1000));

        $subtotal = $opt['price'];
        $tax = round($subtotal * 0.0875, 2);
        $tip = round($subtotal * 0.20, 2);
        $total = round($subtotal + $tax + tip, 2);

        $orderNumber = '#JN-' . rand(10000, 99999);

        $orderData = [
            'orderNumber' => $orderNumber,
            'placedAt' => $placedAt,
            'placedAtFormatted' => $placedAtFormatted,
            'targetReadyAt' => $targetReadyAt,
            'totalDurationMs' => $totalDurationMs,
            'baseCookMinutes' => $baseCookMinutes,
            'surgeAdjustmentMinutes' => $adjMinutes,
            'surgeStatus' => $surge['status'],
            'surgeLabel' => $surge['label'],
            'surgeMarker' => $surge['marker'],
            'selectedOptionId' => $opt['id'],
            'currentStageId' => 1, // Queued at 0%
            'customer' => array_merge([
                'name' => 'Zachery H.',
                'phone' => '(555) 749-2041',
                'pickupType' => 'Store Pickup (Express Shelf)',
                'shelf' => 'SHELF #B-04',
                'vehicle' => 'Silver Audi A4 (Curbside Bay 3)'
            ], $customerOverrides),
            'store' => [
                'name' => STORE_NAME,
                'address' => STORE_ADDRESS,
                'district' => STORE_DISTRICT,
                'phone' => STORE_PHONE,
                'ovenTemp' => STORE_OVEN_TEMP,
                'woodSource' => STORE_WOOD_TYPE
            ],
            'items' => [
                [
                    'id' => 'item-primary',
                    'name' => $opt['name'],
                    'category' => $opt['category'],
                    'description' => $opt['description'],
                    'quantity' => 1,
                    'unitPrice' => $opt['price'],
                    'totalPrice' => $opt['price'],
                    'modifiers' => $opt['modifiers'] ?? []
                ]
            ],
            'pricing' => [
                'subtotal' => $subtotal,
                'tax' => $tax,
                'artisanSurcharge' => 0.00,
                'tip' => $tip,
                'total' => $total,
                'paymentMethod' => 'Apple Pay (•••• 4821)'
            ]
        ];

        $order = new Order($orderData);
        $this->save($order);
        return $order;
    }

    /**
     * Clear / reset active order file
     */
    public function resetOrder(): bool {
        if (file_exists($this->filePath)) {
            @unlink($this->filePath);
        }
        return true;
    }
}
