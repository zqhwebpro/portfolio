<?php
/**
 * Order Repository with Immutable Timestamp Persistence
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/Order.php';

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
     * Retrieve the current active order, or initialize a new one if none exists
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

        // Initialize fresh order
        return $this->createDefaultOrder();
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
     * Create a default mock order with realistic timestamps
     */
    public function createDefaultOrder(): Order {
        $nowMs = (int)(microtime(true) * 1000);
        // Default: placed 6 minutes ago, total prep time 22 minutes (16 minutes remaining)
        $elapsedOffsetMs = 6 * 60 * 1000;
        $totalDurationMs = 22 * 60 * 1000;

        $placedAt = $nowMs - $elapsedOffsetMs;
        $targetReadyAt = $placedAt + $totalDurationMs;
        $placedAtFormatted = date('g:i A', (int)($placedAt / 1000));

        $orderData = [
            'orderNumber' => '#FG-84920',
            'placedAt' => $placedAt,
            'placedAtFormatted' => $placedAtFormatted,
            'targetReadyAt' => $targetReadyAt,
            'totalDurationMs' => $totalDurationMs,
            'currentStageId' => 2, // Fired in oven
            'customer' => [
                'name' => 'Zachery H.',
                'phone' => '(555) 839-2041',
                'pickupType' => 'Store Pickup (Express Shelf)',
                'shelf' => 'SHELF #B-04',
                'vehicle' => 'Silver Audi A4 (Curbside Bay 3)'
            ],
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
                    'id' => 'item-1',
                    'name' => '16" Wood-Fired Hot Honey Soppressata',
                    'category' => 'Artisanal Pizza',
                    'description' => 'Crispy cup pepperoni, spicy soppressata, fior di latte, hot honey glaze, charred blistered sourdough crust.',
                    'quantity' => 1,
                    'unitPrice' => 26.50,
                    'totalPrice' => 26.50,
                    'modifiers' => [
                        ['name' => 'Crust', 'value' => 'Blistered Well-Done (+850°F)'],
                        ['name' => 'Toppings', 'value' => '+ Extra Fresh Basil'],
                        ['name' => 'Side Dip', 'value' => "Mike's Calabrian Hot Honey Pot"]
                    ]
                ],
                [
                    'id' => 'item-2',
                    'name' => 'Charred Broccolini & Garlic Confit',
                    'category' => 'Wood-Grilled Small Plates',
                    'description' => 'Coal-roasted broccolini, aged pecorino toscano, toasted breadcrumbs, Meyer lemon zest.',
                    'quantity' => 1,
                    'unitPrice' => 14.00,
                    'totalPrice' => 14.00,
                    'modifiers' => [
                        ['name' => 'Dressing', 'value' => 'Lemon Garlic Vinaigrette']
                    ]
                ],
                [
                    'id' => 'item-3',
                    'name' => 'Smoked San Marzano Marinara Dipping Pot',
                    'category' => 'House Sauces',
                    'description' => 'DOP San Marzano tomatoes simmered with charred wood garlic & oregano.',
                    'quantity' => 1,
                    'unitPrice' => 3.50,
                    'totalPrice' => 3.50,
                    'modifiers' => []
                ],
                [
                    'id' => 'item-4',
                    'name' => 'San Pellegrino Blood Orange (Aranciata Rossa)',
                    'category' => 'Beverages',
                    'description' => 'Imported Italian sparkling blood orange, 330ml glass bottle.',
                    'quantity' => 2,
                    'unitPrice' => 4.50,
                    'totalPrice' => 9.00,
                    'modifiers' => [
                        ['name' => 'Service', 'value' => 'Chilled / Lime Wedge']
                    ]
                ]
            ],
            'pricing' => [
                'subtotal' => 53.00,
                'tax' => 4.64,
                'artisanSurcharge' => 0.00,
                'tip' => 10.60,
                'total' => 68.24,
                'paymentMethod' => 'Apple Pay (•••• 4821)'
            ]
        ];

        $order = new Order($orderData);
        $this->save($order);
        return $order;
    }

    /**
     * Force reset order to a brand new order starting from now
     */
    public function resetOrder(): Order {
        return $this->createDefaultOrder();
    }
}
