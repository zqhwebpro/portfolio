<?php
/**
 * FORNO & GRATE // Artisanal Wood-Fired Pizzeria & Grill
 * Global Configuration & Kitchen Constants
 */

// Application Constants
define('APP_NAME', 'FORNO & GRATE');
define('APP_TAGLINE', 'Wood-Fired Hearth & Artisanal Pizzeria');
define('APP_VERSION', '2.4.0');

// Store Details
define('STORE_NAME', 'FORNO & GRATE Artisanal Hearth');
define('STORE_ADDRESS', '412 S. Artisan Way, Suite 100');
define('STORE_DISTRICT', 'Hearthstone Historic District');
define('STORE_PHONE', '(555) 321-PIZZA');
define('STORE_OVEN_TEMP', '865°F');
define('STORE_WOOD_TYPE', 'Seasoned White Oak');

// Paths
define('DATA_DIR', __DIR__ . '/data');
define('ORDERS_FILE', DATA_DIR . '/orders.json');

// Kitchen Stages Configuration
$KITCHEN_STAGES = [
    1 => [
        'id' => 1,
        'name' => 'Order Received',
        'short_name' => 'Queued',
        'tagline' => 'Ticket printed at hearth station',
        'description' => 'Dough stretched and San Marzano base applied by Chef Marco.',
        'target_pct' => 0.20,
        'icon' => 'ticket'
    ],
    2 => [
        'id' => 2,
        'name' => 'Fired in Wood Oven',
        'short_name' => 'In Oven',
        'tagline' => 'Blistering at 865°F over White Oak',
        'description' => 'Rotating near roaring oak embers for classic leopard crust blisters.',
        'target_pct' => 0.65,
        'icon' => 'flame'
    ],
    3 => [
        'id' => 3,
        'name' => 'Quality Check & Boxed',
        'short_name' => 'Boxed',
        'tagline' => 'Finishing garnish & heat packaging',
        'description' => 'Drizzling hot honey, fresh basil chiffonade & boxed in thermal container.',
        'target_pct' => 0.90,
        'icon' => 'package'
    ],
    4 => [
        'id' => 4,
        'name' => 'Ready on Counter',
        'short_name' => 'Ready',
        'tagline' => 'Awaiting your arrival at Shelf #B-04',
        'description' => 'Placed under gentle thermal warmers. Ready for express pick-up!',
        'target_pct' => 1.00,
        'icon' => 'check'
    ]
];
