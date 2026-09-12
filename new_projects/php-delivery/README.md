# FORNO & GRATE // Live Take-Out Order Tracking Dashboard

A streamlined, high-reliability single-page order-tracking and checkout experience for an artisanal wood-fired pizzeria & grill, built in pure modern Object-Oriented PHP with an interactive vanilla JavaScript readiness engine.

---

## 🍕 Key Architectural Problems Solved

### 1. Immutable Order Placement Timestamp
- **The Legacy Bug**: Clunky legacy online ordering platforms recalculate the order creation time on every page refresh, constantly shifting the clock.
- **The Solution**: 
  - The PHP `OrderRepository` derives and locks an immutable epoch timestamp (`placedAt`, e.g. `1726097520000`).
  - Formatted time strings (e.g. `Placed at 6:42 PM`) are rendered server-side and preserved in `data/orders.json` and client-side `localStorage`.
  - Refreshing or backgrounding the tab never shifts the order placement clock.

### 2. Take-Out Readiness Engine & Drift-Free Countdown
- Countdown duration is calculated from the absolute target timestamp:
  $$\Delta t = \text{targetReadyAt} - \text{Date.now}()$$
- An active 4-Stage Kitchen Pipeline visualizes preparation:
  1. **Order Received & Queued** (ticket printed)
  2. **Fired in Wood Oven** (blistering at 865°F over white oak with animated flame glow)
  3. **Quality Check & Boxed** (finishing hot honey drizzle & thermal packaging)
  4. **Ready on Counter** (express shelf `#B-04` with celebratory audio chime)
- Procedural Web Audio API synthesizer generates tactile clicks and readiness fanfare without external asset dependencies.

### 3. Streamlined Two-Column Information Architecture
- **Left Column**: Live readiness countdown, SVG circular progress track, 4-stage kitchen visualizer, in-store express shelf pickup directives (`SHELF #B-04`), curbside bay instructions, and Google Maps deep links.
- **Right Column**: Itemized order summary with crust specifications and customized topping badges, price breakdown with tax and kitchen tip, one-tap reorder, and printable thermal receipt modal.

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
│   │   └── style.css         # Modern Industrial Pizzeria design system
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
