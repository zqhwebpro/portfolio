<?php
/**
 * FORNO & GRATE // Artisanal Wood-Fired Pizzeria & Grill
 * Global Configuration & Kitchen Constants
 */

// Application Constants
define('APP_NAME', 'FORNO & GRATE');
define('APP_TAGLINE', 'Wood-Fired Hearth & Artisanal Pizzeria');
define('APP_VERSION', '2.5.0');

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

// 5 Artisanal Menu Cooking Options
$MENU_OPTIONS = [
    'option-margherita' => [
        'id' => 'option-margherita',
        'name' => '14" Margherita D.O.P. & Fresh Basil',
        'category' => 'Express Neapolitan Pizza',
        'badge' => '⚡ FASTEST (12 MINS)',
        'baseCookMinutes' => 12,
        'price' => 22.00,
        'icon' => '🍕',
        'description' => 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, EVOO, and 60-second blistered sourdough crust.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Light Leopard Char (900°F)'],
            ['name' => 'Cheese', 'value' => 'Campania Buffalo Mozzarella D.O.P.'],
            ['name' => 'Finishing Oil', 'value' => 'Cold-Pressed Tuscan EVOO']
        ]
    ],
    'option-soppressata' => [
        'id' => 'option-soppressata',
        'name' => '16" Wood-Fired Hot Honey Soppressata',
        'category' => 'Signature Hearth Pizza',
        'badge' => '🔥 BESTSELLER (18 MINS)',
        'baseCookMinutes' => 18,
        'price' => 26.50,
        'icon' => '🍯',
        'description' => 'Crispy cupping pepperoni, aged spicy soppressata, fior di latte, hot honey drizzle, charred sourdough crust, and fresh basil.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Blistered Well-Done (+850°F)'],
            ['name' => 'Toppings', 'value' => '+ Extra Fresh Basil'],
            ['name' => 'Side Dip', 'value' => "Mike's Calabrian Hot Honey Pot"]
        ]
    ],
    'option-funghi' => [
        'id' => 'option-funghi',
        'name' => '16" Wild Truffle & Forest Funghi',
        'category' => 'Gourmet White Pizza',
        'badge' => '🍄 CHEF CHOICE (22 MINS)',
        'baseCookMinutes' => 22,
        'price' => 28.00,
        'icon' => '🌿',
        'description' => 'Roasted cremini & chanterelle mushrooms, creamy fontina, roasted garlic crema, thyme sprigs, and Italian white truffle oil.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Medium Hearth Crisp'],
            ['name' => 'Sauce Base', 'value' => 'Roasted Garlic Truffle Crema'],
            ['name' => 'Mushrooms', 'value' => 'Pan-Seared Chanterelles & Thyme']
        ]
    ],
    'option-ribeye' => [
        'id' => 'option-ribeye',
        'name' => 'Tuscan Oak-Grilled Prime Ribeye & Broccolini',
        'category' => 'Wood-Fired Grill Entrée',
        'badge' => '🥩 HEARTH GRILL (28 MINS)',
        'baseCookMinutes' => 28,
        'price' => 38.50,
        'icon' => '🥩',
        'description' => '14oz Prime Bone-in Ribeye seared over glowing white oak coals with rosemary garlic butter, sea salt flakes, and charred broccolini.',
        'modifiers' => [
            ['name' => 'Preparation', 'value' => 'Medium Rare (Oak Coal Seared)'],
            ['name' => 'Butter', 'value' => 'Whipped Rosemary & Roasted Garlic'],
            ['name' => 'Side', 'value' => 'Coal-Roasted Broccolini with Lemon Zest']
        ]
    ],
    'option-feast' => [
        'id' => 'option-feast',
        'name' => 'Hearth Grand Feast for Four',
        'category' => 'Family Sharing Banquet',
        'badge' => '👑 GRAND BANQUET (35 MINS)',
        'baseCookMinutes' => 35,
        'price' => 78.00,
        'icon' => '👑',
        'description' => 'Two 16" Hearth Pizzas (Hot Honey Soppressata & Funghi), Charred Broccolini, Smoked San Marzano Dipping Pots, and 4 Blood Orange sodas.',
        'modifiers' => [
            ['name' => 'Pizza 1', 'value' => '16" Hot Honey Soppressata'],
            ['name' => 'Pizza 2', 'value' => '16" Wild Truffle & Funghi'],
            ['name' => 'Beverages', 'value' => '4× San Pellegrino Blood Orange']
        ]
    ]
];

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
