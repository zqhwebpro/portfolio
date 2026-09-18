# JIM & NINA'S // Little Italy Pizzeria & Ristorante // Est. 1974
## Live Take-Out Order Tracking & Stone Deck Readiness Dashboard

An authentic Italian-American neighborhood pizzeria take-out tracking and guest check application, built in modern Object-Oriented PHP with an interactive vanilla JavaScript readiness engine.

---

## 🍕 Key Architectural Features

### 1. Authentic Italian Pizzeria Design & Typography
- **Classic Neighborhood Pizzeria Aesthetic**: Red and white Italian gingham checkered ribbons, warm stone deck hearth glow, mozzarella gold accents, and vintage guest checks.
- **Curated Typography**: **Playfair Display** (Italian trattoria display headings), **Plus Jakarta Sans** (crisp, readable body copy), and **JetBrains Mono** (authentic guest check thermal readouts).

### 2. 5 Menu Dishes & Time-of-Day Kitchen Surge Engine
- 5 Selectable artisanal dishes with distinct bake times:
  1. **14" Little Italy Margherita D.O.P.** (12 mins) — 60-second blistered crust, buffalo mozzarella D.O.P.
  2. **16" Jim & Nina's Hot Honey Pepperoni Cup Special** (18 mins) — Cupping pepperoni, spicy soppressata, hot honey drizzle.
  3. **16" Big Mouth Sicilian Deep Dish / Forest Truffle** (22 mins) — Olive-oil fried thick crust, fontina, wild chanterelles.
  4. **Marcello's Stuffed Calzone & Meatball Parmigiana Platter** (28 mins) — Ricotta, whole milk mozzarella, meatballs & garlic knots.
  5. **The Godfather Grand Feast for the Family (Serves 4-6)** (35 mins) — Two 16" Pizzas, garlic knots, mozzarella sticks & Italian sodas.
- **Dynamic Kitchen Surge Adjustment**:
  - `🔥 PEAK DINNER RUSH (+10m)`: Automatically applied during dinner (5:30 PM - 8:30 PM) & lunch rushes.
  - `⚡ OFF-PEAK EXPRESS (-10m)`: Automatically applied during quiet afternoon & late night hours.
  - `🟡 STANDARD PACE (±0m)`: Nominal stone deck baking times.

### 3. Immutable Order Placement Timestamp & Countdown
- Derive and lock an immutable epoch timestamp (`placedAt`, e.g. `1726097520000`).
- Drift-free countdown calculated against the absolute target timestamp:
  $$\Delta t = \text{targetReadyAt} - \text{Date.now}()$$
- 4-Stage Kitchen Pipeline visualizer:
  1. **Order Received & Dough Tossed** (ticket in, dough tossed)
  2. **Stone Deck & Wood Oven Firing** (865°F stone deck baking)
  3. **Boxed & Garlic Butter Glazed** (hot honey drizzle & thermal packaging)
  4. **Hot on the Counter** (express shelf `#B-04` with audio chime)

### 4. Interactive Simulation & Thermal Guest Check
- **Mock Order Placement Modal**: Select any of the 5 options, simulate rush hours, and fire the kitchen clock.
- **Thermal Guest Check Modal**: Authentic printed guest check receipt with official Italian stamp and itemization.
- **Reset Button**: One-tap reset to test new mock orders and time-of-day surge states.

---

## 📂 Project Structure

```
portfolio/new_projects/php-delivery/
├── index.php                 # Main server-side rendered PHP dashboard
├── index.html                # Static mirror for GitHub Pages preview
├── config.php                # Global constants, store info & stage metadata
├── classes/
│   ├── Order.php             # Order entity model
│   ├── OrderRepository.php   # File & session repository with immutable epoch storage
│   └── KitchenManager.php    # Stage progression logic and countdown formatting
├── api/
│   └── order.php             # JSON REST API endpoint (GET / POST reset / stage)
├── data/
│   └── orders.json           # JSON flat-file database storage
├── assets/
│   ├── css/
│   │   └── style.css         # Authentic Italian Pizzeria design system
│   └── js/
│       ├── tracker.js        # Real-time client countdown & stage coordinator
│       └── audio.js          # Procedural Web Audio synthesizer
└── README.md                 # Project documentation
```

---

## 🚀 Running Locally

### With PHP Built-in Server:
```bash
cd portfolio/new_projects/php-delivery
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

### In Static / Preview Mode:
Open `index.html` directly in any modern browser.
