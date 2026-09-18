<?php
/**
 * JIM & NINA'S // Little Italy Pizzeria & Ristorante // Est. 1974
 * Global Configuration & Kitchen Constants
 */

// Application Constants
define('APP_NAME', "JIM & NINA'S");
define('APP_TAGLINE', 'Little Italy Pizzeria & Ristorante // Est. 1974');
define('APP_VERSION', '3.0.0');

// Store Details
define('STORE_NAME', "Jim & Nina's Little Italy Pizzeria");
define('STORE_ADDRESS', '142 Mulberry Street, Little Italy');
define('STORE_DISTRICT', 'Historic Pizzeria Quarter');
define('STORE_PHONE', '(555) 749-NINA');
define('STORE_OVEN_TEMP', '865°F');
define('STORE_WOOD_TYPE', 'Stone Deck & Wood-Fired Hearth');

// Paths
define('DATA_DIR', __DIR__ . '/data');
define('ORDERS_FILE', DATA_DIR . '/orders.json');

// 5 Authentic Italian-American Menu Cooking Options
$MENU_OPTIONS = [
    'option-margherita' => [
        'id' => 'option-margherita',
        'name' => '14" Little Italy Margherita D.O.P.',
        'category' => 'Classic Neapolitan Pizza',
        'badge' => '⚡ FASTEST PREP (12 MINS)',
        'baseCookMinutes' => 12,
        'price' => 22.00,
        'icon' => '🍕',
        'description' => 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, EVOO, and 60-second blistered sourdough crust.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Classic Leopard Blister (865°F)'],
            ['name' => 'Cheese', 'value' => 'Campania Buffalo Mozzarella D.O.P.'],
            ['name' => 'Finishing', 'value' => 'Cold-Pressed Sicilian EVOO & Fresh Basil']
        ]
    ],
    'option-soppressata' => [
        'id' => 'option-soppressata',
        'name' => "16\" Jim & Nina's Hot Honey Pepperoni Cup Special",
        'category' => 'Signature House Special',
        'badge' => '🔥 HOUSE SPECIAL (18 MINS)',
        'baseCookMinutes' => 18,
        'price' => 26.50,
        'icon' => '🍯',
        'description' => 'Crispy cupping pepperoni, spicy calabrese soppressata, aged fior di latte, hot honey drizzle, and charred blistered crust.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Well-Done Hearth Blistered'],
            ['name' => 'Toppings', 'value' => 'Double Cupping Pepperoni & Fresh Oregano'],
            ['name' => 'Side Dip', 'value' => "Jim & Nina's Calabrian Hot Honey Pot"]
        ]
    ],
    'option-funghi' => [
        'id' => 'option-funghi',
        'name' => '16" Big Mouth Sicilian Deep Dish / Forest Truffle',
        'category' => 'Gourmet Grandma Thick Crust',
        'badge' => '🍄 GRANDMA RECIPE (22 MINS)',
        'baseCookMinutes' => 22,
        'price' => 28.00,
        'icon' => '🌿',
        'description' => 'Olive-oil fried thick Sicilian crust, roasted cremini & chanterelles, fontina, roasted garlic crema, and Italian white truffle oil.',
        'modifiers' => [
            ['name' => 'Crust', 'value' => 'Crispy Olive-Oil Fried Sicilian Pan'],
            ['name' => 'Sauce Base', 'value' => 'Roasted Garlic Truffle Crema'],
            ['name' => 'Mushrooms', 'value' => 'Sautéed Wild Chanterelles & Thyme']
        ]
    ],
    'option-ribeye' => [
        'id' => 'option-ribeye',
        'name' => "Marcello's Stuffed Calzone & Meatball Parmigiana Platter",
        'category' => 'Wood-Fired Hearth Special',
        'badge' => "🥩 MARCELLO'S SPECIAL (28 MINS)",
        'baseCookMinutes' => 28,
        'price' => 34.50,
        'icon' => '🥩',
        'description' => "Jumbo wood-fired calzone stuffed with ricotta & mozzarella, served with Marcello's slow-simmered beef meatballs & garlic knots.",
        'modifiers' => [
            ['name' => 'Preparation', 'value' => 'Hearth Baked with Garlic Butter Glaze'],
            ['name' => 'Cheese', 'value' => 'Whole Milk Ricotta & Aged Provolone'],
            ['name' => 'Side', 'value' => '4 Jumbo Garlic Knots & Warm Marinara']
        ]
    ],
    'option-feast' => [
        'id' => 'option-feast',
        'name' => 'The Godfather Grand Feast for the Family (Serves 4-6)',
        'category' => 'Family Sharing Banquet',
        'badge' => '👑 GRAND FEAST (35 MINS)',
        'baseCookMinutes' => 35,
        'price' => 74.00,
        'icon' => '👑',
        'description' => "Two 16\" Hearth Pizzas (Jim & Nina's Special & Margherita), 8 Jumbo Garlic Knots, Stuffed Mozzarella Sticks, Marinara Pots, and 4 Italian Sodas.",
        'modifiers' => [
            ['name' => 'Pizza 1', 'value' => "16\" Jim & Nina's Hot Honey Pepperoni"],
            ['name' => 'Pizza 2', 'value' => '16" Little Italy Margherita D.O.P.'],
            ['name' => 'Sides & Drinks', 'value' => '8 Jumbo Garlic Knots & 4 San Pellegrino Sodas']
        ]
    ]
];

// Kitchen Stages Configuration
$KITCHEN_STAGES = [
    1 => [
        'id' => 1,
        'name' => 'Order Received & Dough Tossed',
        'short_name' => 'Queued',
        'tagline' => 'Hand-stretched sourdough & San Marzano base',
        'description' => 'Dough tossed high, ladled with grandma’s simmered gravy and shredded Grande mozzarella.',
        'target_pct' => 0.20,
        'icon' => 'ticket'
    ],
    2 => [
        'id' => 2,
        'name' => 'Stone Deck & Wood Oven Firing',
        'short_name' => 'In Oven',
        'tagline' => 'Blistering at 865°F on stone hearth deck',
        'description' => 'Rotating on seasoned stone deck under roaring oak flames for classic blistered crust.',
        'target_pct' => 0.65,
        'icon' => 'flame'
    ],
    3 => [
        'id' => 3,
        'name' => 'Boxed & Garlic Butter Glazed',
        'short_name' => 'Boxed',
        'tagline' => 'Hot honey drizzle, pecorino & thermal pack',
        'description' => 'Drizzled with hot honey, fresh basil, pecorino romano, and packed in insulated thermal box.',
        'target_pct' => 0.90,
        'icon' => 'package'
    ],
    4 => [
        'id' => 4,
        'name' => 'Hot on the Counter',
        'short_name' => 'Ready',
        'tagline' => 'Awaiting pickup on Express Shelf #B-04',
        'description' => 'Hot, blistered, and ready! Grab your order from Shelf #B-04 or curbside bay #3.',
        'target_pct' => 1.00,
        'icon' => 'check'
    ]
];
