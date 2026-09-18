<?php
/**
 * JIM & NINA'S // Little Italy Pizzeria & Ristorante // Est. 1974
 * Main Order Tracking & Live Take-Out Dashboard
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/classes/OrderRepository.php';
require_once __DIR__ . '/classes/KitchenManager.php';

$repo = new OrderRepository();
$order = $repo->getCurrentOrder();
$currentStageId = KitchenManager::resolveStage($order, $KITCHEN_STAGES);
$remainingMs = $order->getRemainingMs();
$progressRatio = $order->getProgressRatio();
$isReady = ($currentStageId === 4 || $remainingMs <= 0);

// Pass order JSON directly to browser JS for real-time tick loop
$orderJson = json_encode($order->toArray(), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live Take-Out Tracker &amp; Guest Check // <?= htmlspecialchars(APP_NAME) ?></title>
  <meta name="description" content="Live take-out order tracker, stone deck oven status, 5 cooking options, and surge-adjusted readiness dashboard for <?= htmlspecialchars(APP_NAME) ?>." />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%2312100E'/><circle cx='50' cy='50' r='40' fill='%23C8102E'/><polygon points='50,18 80,78 20,78' fill='%23F59E0B'/></svg>" />

  <!-- Google Fonts: Playfair Display, Cinzel, Plus Jakarta Sans, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Design System CSS -->
  <link rel="stylesheet" href="./assets/css/style.css" />
  
  <!-- Server-Injected Initial State -->
  <script>
    window.ORDER_DATA = <?= $orderJson ?>;
  </script>
</head>
<body>

  <!-- Authentic Italian Pizzeria Red & White Checkered Gingham Top Ribbon -->
  <div class="gingham-ribbon"></div>

  <!-- Top Telemetry Header -->
  <header style="background: rgba(28, 25, 23, 0.92); backdrop-filter: blur(14px); border-bottom: 1px solid var(--vintage-border); position: sticky; top: 0; z-index: 50;">
    <div style="background: #0D0B0A; border-bottom: 1px solid rgba(255,245,230,0.06); padding: 0.4rem 1.5rem; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 1.25rem;">
        <span style="color: var(--italian-red); font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
          🔥 STONE DECK HEARTH: <?= htmlspecialchars($order->store['ovenTemp'] ?? '865°F') ?> (<?= htmlspecialchars($order->store['woodSource'] ?? 'Stone Deck & Wood Hearth') ?>)
        </span>
        <span style="color: var(--basil-green);">
          ⏱️ ORDER PLACED: <strong id="header-placed-time"><?= htmlspecialchars($order->placedAtFormatted) ?></strong>
        </span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button onclick="window.openOrderModal()" class="btn-accent-gold" style="padding: 0.25rem 0.75rem; font-size: 0.74rem; border-radius: var(--radius-full);">
          ➕ Place Mock Order
        </button>
        <button onclick="window.resetOrder()" class="btn-secondary" style="padding: 0.25rem 0.75rem; font-size: 0.74rem; border-radius: var(--radius-full); border-color: var(--italian-red); color: #FF6B57;">
          🔁 Reset Order
        </button>
        <button id="sfx-toggle-btn" onclick="window.KitchenAudio && window.KitchenAudio.toggleMute()" class="btn-secondary" style="padding: 0.25rem 0.65rem; font-size: 0.74rem; border-radius: var(--radius-full);">
          SFX ON
        </button>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 0.9rem clamp(1rem, 3vw, 2rem); flex-wrap: wrap; gap: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.95rem;">
        <div style="width: 46px; height: 46px; background: linear-gradient(135deg, var(--italian-red), var(--italian-red-dark)); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px var(--italian-red-glow); border: 1px solid rgba(255,255,255,0.25);">
          <span style="font-size: 1.5rem;">🍕</span>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h1 style="font-family: var(--font-serif); font-size: clamp(1.3rem, 2.4vw, 1.7rem); font-weight: 900; letter-spacing: -0.01em; color: #FAF5EE; margin: 0; line-height: 1.1;">
              <?= htmlspecialchars(APP_NAME) ?>
            </h1>
            <span class="badge badge-gold" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">EST. 1974</span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--mozzarella-gold); font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
            <?= htmlspecialchars(APP_TAGLINE) ?>
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button onclick="window.openOrderModal()" class="btn-primary" style="font-size: 0.84rem; padding: 0.5rem 1.05rem;">
          🍕 Select Dish &amp; Cook Clock
        </button>
        <a href="../index.html" class="btn-secondary" style="font-size: 0.82rem; padding: 0.5rem 0.95rem;">
          ← Back to Projects
        </a>
      </div>
    </div>
  </header>

  <!-- Main Dashboard Content -->
  <main class="container" style="padding-top: clamp(1.5rem, 3vw, 2.5rem); padding-bottom: 5rem;">
    
    <div class="dashboard-grid">
      
      <!-- LEFT COLUMN: Live Operational Progress & Directives -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">

        <!-- 1. Live Countdown Status Hero Card -->
        <div id="countdown-hero-card" class="pizzeria-card <?= $isReady ? 'animate-ready-pulse' : '' ?>" style="padding: clamp(1.5rem, 4vw, 2.25rem); border: <?= $isReady ? '1px solid var(--basil-green)' : '1px solid var(--vintage-border)' ?>; background: <?= $isReady ? 'linear-gradient(145deg, rgba(21, 128, 61, 0.15), rgba(28, 25, 23, 0.98))' : 'linear-gradient(145deg, rgba(200, 16, 46, 0.1), rgba(28, 25, 23, 0.98))' ?>; overflow: hidden; position: relative;">
          
          <!-- Inner card ribbon accent -->
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: repeating-linear-gradient(90deg, var(--italian-red) 0, var(--italian-red) 15px, #FAF5EE 15px, #FAF5EE 30px, var(--basil-green) 30px, var(--basil-green) 45px, #FAF5EE 45px, #FAF5EE 60px);"></div>

          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; margin-top: 0.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span id="hero-status-badge" class="badge <?= $isReady ? 'badge-green' : 'badge-red' ?>">
                <?= $isReady ? 'HOT ON THE COUNTER // READY FOR PICKUP' : 'LIVE STATUS: ' . strtoupper($KITCHEN_STAGES[$currentStageId]['name']) ?>
              </span>
              <!-- Time-of-Day Activity Surge Marker -->
              <span id="hero-surge-marker" class="badge <?= $order->surgeStatus === 'PEAK' ? 'badge-red' : ($order->surgeStatus === 'SLOW' ? 'badge-green' : 'badge-gold') ?>" title="<?= htmlspecialchars($order->surgeLabel) ?>">
                <?= htmlspecialchars($order->surgeMarker) ?>
              </span>
              <span class="badge badge-muted">
                <?= htmlspecialchars($order->customer['pickupType']) ?>
              </span>
            </div>

            <div id="order-number-badge" class="font-mono" style="font-size: 0.88rem; font-weight: 800; color: var(--mozzarella-gold); background: rgba(245, 158, 11, 0.12); padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--vintage-border-gold);">
              ORDER <?= htmlspecialchars($order->orderNumber) ?>
            </div>
          </div>

          <!-- Center Grid: Text and Circular SVG Gauge -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 1.5rem; align-items: center; margin-bottom: 1.75rem;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
                <span>🇮🇹</span> ESTIMATED STONE DECK READINESS
              </div>
              <h2 id="hero-title-text" style="font-family: var(--font-serif); font-size: clamp(1.85rem, 4vw, 2.65rem); font-weight: 900; line-height: 1.1; color: #FAF5EE; margin-bottom: 0.65rem;">
                <?php if ($isReady): ?>
                  <span style="color: var(--basil-green);">Hot on the Counter!</span>
                <?php else: ?>
                  Ready in <span style="color: var(--mozzarella-gold);">~<?= max(1, (int)ceil($remainingMs / 60000)) ?> mins</span>
                <?php endif; ?>
              </h2>
              <p id="hero-subtext" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0; max-width: 420px;">
                <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['description']) ?>
              </p>
            </div>

            <!-- Circular Progress Ring -->
            <div style="display: flex; justify-content: center; position: relative;">
              <div style="position: relative; width: 170px; height: 170px;">
                <svg width="170" height="170" style="transform: rotate(-90deg);">
                  <circle cx="85" cy="85" r="75" fill="transparent" stroke="rgba(255, 255, 255, 0.08)" stroke-width="11" />
                  <circle id="countdown-svg-circle" cx="85" cy="85" r="75" fill="transparent" stroke="<?= $isReady ? 'var(--basil-green)' : 'var(--italian-red)' ?>" stroke-width="11" stroke-dasharray="471.24" stroke-dashoffset="<?= (1 - $progressRatio) * 471.24 ?>" stroke-linecap="round" style="transition: stroke-dashoffset 0.5s ease;" />
                </svg>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                  <span id="countdown-digits" class="font-mono" style="font-size: 1.95rem; font-weight: 900; color: #FAF5EE; letter-spacing: -0.02em; line-height: 1;">
                    <?= KitchenManager::formatCountdown($remainingMs) ?>
                  </span>
                  <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.3rem; letter-spacing: 0.05em;">
                    MIN : SEC
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Immutable Metadata Strip -->
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 0.9rem 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 1rem; font-family: var(--font-mono); font-size: 0.82rem;">
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">PLACED TIME (IMMUTABLE):</div>
              <div style="color: #FAF5EE; font-weight: 800;">
                ⏱️ <span id="meta-placed-time"><?= htmlspecialchars($order->placedAtFormatted) ?></span>
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">TARGET PICKUP WINDOW:</div>
              <div style="color: #FAF5EE; font-weight: 800;" id="meta-target-ready">
                <?= htmlspecialchars($order->getTargetReadyFormatted()) ?>
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">EXPRESS PICKUP SHELF:</div>
              <div style="color: var(--mozzarella-gold); font-weight: 800;" id="meta-shelf">
                <?= htmlspecialchars($order->customer['shelf']) ?>
              </div>
            </div>
          </div>

        </div>

        <!-- 2. Active Kitchen Pipeline Visualizer -->
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.85rem);">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--vintage-border); padding-bottom: 0.9rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.25rem;">👨‍🍳</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.2rem; font-weight: 800; color: #FAF5EE; margin: 0;">
                STONE DECK &amp; WOOD OVEN PIPELINE
              </h3>
            </div>
            <span class="badge badge-gold">
              HAND-CRAFTED PREPARATION
            </span>
          </div>

          <!-- Progress Rail & 4 Stage Nodes -->
          <div style="position: relative; margin-bottom: 1.75rem; padding: 0 0.5rem;">
            <div style="position: absolute; top: 24px; left: 30px; right: 30px; height: 5px; background: rgba(255, 255, 255, 0.08); border-radius: 3px; z-index: 1;">
              <div id="pipeline-rail-fill" style="height: 100%; width: <?= min(100, max(5, $progressRatio * 100)) ?>%; background: linear-gradient(90deg, var(--mozzarella-gold), var(--italian-red)); border-radius: 3px; transition: width 0.4s ease;"></div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); position: relative; z-index: 2;">
              <?php foreach ($KITCHEN_STAGES as $s): 
                $isCompleted = $currentStageId > $s['id'];
                $isActive = $currentStageId === $s['id'];
              ?>
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 4px;">
                  <div id="stage-node-<?= $s['id'] ?>" class="<?= $isActive && $s['id'] === 2 ? 'animate-oven-active' : '' ?>" style="width: 50px; height: 50px; border-radius: 50%; background: <?= $isCompleted ? 'var(--basil-green)' : ($isActive ? ($s['id'] === 2 ? 'var(--italian-red)' : 'var(--mozzarella-gold)') : 'var(--bg-surface-elevated)') ?>; border: 2px solid <?= $isCompleted ? 'var(--basil-green)' : ($isActive ? '#FFFFFF' : 'var(--vintage-border)') ?>; display: flex; align-items: center; justify-content: center; margin-bottom: 0.65rem; transition: all 0.3s ease; font-size: 1.25rem; box-shadow: <?= $isActive ? '0 4px 12px rgba(0,0,0,0.6)' : 'none' ?>;">
                    <?php 
                      if ($s['icon'] === 'ticket') echo '🎟️';
                      else if ($s['icon'] === 'flame') echo '🔥';
                      else if ($s['icon'] === 'package') echo '📦';
                      else echo '✅';
                    ?>
                  </div>
                  <div id="stage-text-<?= $s['id'] ?>" style="font-size: 0.85rem; font-weight: <?= $isActive ? '800' : '600' ?>; color: <?= $isActive ? '#FFFFFF' : ($isCompleted ? 'var(--text-primary)' : 'var(--text-muted)') ?>;">
                    <?= htmlspecialchars($s['short_name']) ?>
                  </div>
                  <div style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);"><?= htmlspecialchars($s['tagline']) ?></div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Active Stage Callout Narration -->
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 1.1rem 1.35rem; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--italian-red-glow); border: 1px solid var(--italian-red); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.2rem;">
              🔥
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; flex-wrap: wrap;">
                <span id="stage-callout-title" class="font-mono" style="font-size: 0.8rem; font-weight: 800; color: var(--mozzarella-gold);">
                  STAGE <?= $currentStageId ?> OF 4: <?= strtoupper($KITCHEN_STAGES[$currentStageId]['name']) ?>
                </span>
                <span id="stage-callout-tag" class="badge badge-muted" style="font-size: 0.68rem;">
                  <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['tagline']) ?>
                </span>
              </div>
              <p id="stage-callout-desc" style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">
                <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['description']) ?>
              </p>
            </div>
          </div>
        </div>

        <!-- 3. Direct Pickup Directives & Navigation Card -->
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.85rem);">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--vintage-border); padding-bottom: 0.9rem; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.2rem;">📍</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 800; color: #FAF5EE; margin: 0;">
                LITTLE ITALY STORE PICKUP &amp; CURBSIDE
              </h3>
            </div>
            <span class="badge badge-green">
              EXPRESS READY
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 1.1rem;">
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--mozzarella-gold); font-weight: 800; margin-bottom: 0.35rem;">
                OPTION A: IN-STORE EXPRESS SHELF
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">
                Walk directly into <?= htmlspecialchars($order->store['address'] ?? '142 Mulberry Street') ?> to the thermal pickup cubby marked <strong style="color: #FFF;">SHELF #B-04</strong> near the main stone oven. Grab your insulated tote and bypass the counter line.
              </p>
            </div>

            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 1.1rem;">
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--basil-green); font-weight: 800; margin-bottom: 0.35rem;">
                OPTION B: CURBSIDE DELIVERY
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">
                Pull into <strong style="color: #FFF;">Curbside Bay #3</strong> on Mulberry Way. Flash your hazard lights, and our runner will bring your piping hot order directly to your vehicle (<?= htmlspecialchars($order->customer['vehicle'] ?? 'Silver Audi A4') ?>).
              </p>
            </div>
          </div>

          <!-- Actions: Google Maps & Store Details -->
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="https://maps.google.com/?q=142+Mulberry+Street+Little+Italy" target="_blank" rel="noopener" class="btn-primary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              🗺️ Directions to 142 Mulberry St
            </a>
            <a href="tel:5557496462" class="btn-secondary">
              📞 Call Pizzeria (<?= htmlspecialchars($order->store['phone'] ?? '(555) 749-NINA') ?>)
            </a>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Itemized Collapsible Order Receipt -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.85rem); position: relative; overflow: hidden;">
          
          <!-- Inner card gingham ribbon -->
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: repeating-linear-gradient(90deg, var(--italian-red) 0, var(--italian-red) 12px, #FAF5EE 12px, #FAF5EE 24px, var(--basil-green) 24px, var(--basil-green) 36px, #FAF5EE 36px, #FAF5EE 48px);"></div>

          <!-- Order Reference Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--vintage-border); padding-bottom: 1rem; margin-bottom: 1.25rem; margin-top: 0.25rem;">
            <div>
              <div class="font-mono" style="font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em;">
                OFFICIAL GUEST CHECK &amp; RECEIPT
              </div>
              <h3 id="receipt-order-num" style="font-family: var(--font-serif); font-size: 1.45rem; font-weight: 900; color: #FAF5EE; margin: 0.15rem 0;">
                <?= htmlspecialchars($order->orderNumber) ?>
              </h3>
              <div class="font-mono" style="font-size: 0.75rem; color: var(--text-secondary);">
                Guest: <?= htmlspecialchars($order->customer['name']) ?> // <?= htmlspecialchars($order->customer['phone']) ?>
              </div>
            </div>

            <button onclick="window.openReceiptModal()" class="btn-secondary" style="font-size: 0.78rem; padding: 0.4rem 0.85rem; border-color: var(--mozzarella-gold); color: var(--mozzarella-gold);">
              🖨️ View / Print Check
            </button>
          </div>

          <!-- Itemized List Container -->
          <div id="receipt-items-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            <?php foreach ($order->items as $item): ?>
              <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 0.95rem 1.15rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <div style="font-weight: 800; color: #FAF5EE; font-size: 0.95rem;">
                    <?= (int)$item['quantity'] ?>× <?= htmlspecialchars($item['name']) ?>
                  </div>
                  <div class="font-mono" style="font-weight: 800; color: var(--mozzarella-gold); font-size: 0.95rem;">
                    $<?= number_format((float)$item['totalPrice'], 2) ?>
                  </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.35;">
                  <?= htmlspecialchars($item['description']) ?>
                </div>
                <?php if (!empty($item['modifiers'])): ?>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem;">
                    <?php foreach ($item['modifiers'] as $mod): ?>
                      <span class="badge badge-muted" style="font-size: 0.68rem; padding: 0.15rem 0.5rem;"><?= htmlspecialchars($mod['value']) ?></span>
                    <?php endforeach; ?>
                  </div>
                <?php endif; ?>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Pricing Calculations -->
          <div style="border-top: 1px solid var(--vintage-border); padding-top: 1rem; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Subtotal</span>
              <span id="pricing-subtotal">$<?= number_format((float)$order->pricing['subtotal'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>NYC Local Sales Tax (8.75%)</span>
              <span id="pricing-tax">$<?= number_format((float)$order->pricing['tax'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Pizzaiolo &amp; Staff Gratitude Tip (20%)</span>
              <span id="pricing-tip">$<?= number_format((float)$order->pricing['tip'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #FAF5EE; font-weight: 900; font-size: 1.25rem; border-top: 1px dashed var(--vintage-border); padding-top: 0.85rem; margin-top: 0.25rem;">
              <span style="font-family: var(--font-serif);">TOTAL PAID</span>
              <span id="pricing-total" style="color: var(--mozzarella-gold);">$<?= number_format((float)$order->pricing['total'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem;">
              <span>Payment Tender</span>
              <span><?= htmlspecialchars($order->pricing['paymentMethod'] ?? 'Apple Pay (•••• 4821)') ?></span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            <button onclick="window.openOrderModal()" class="btn-primary" style="width: 100%;">
              🍕 Choose Different Dish / Mock Order
            </button>
            <button onclick="window.resetOrder()" class="btn-secondary" style="width: 100%; border-color: var(--italian-red); color: #FF6B57;">
              🔁 Reset Kitchen Order
            </button>
          </div>
        </div>

        <!-- Store Guarantee & Freshness Policy -->
        <div class="pizzeria-card-elevated" style="padding: 1.35rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
          <div style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 800; color: #FAF5EE; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>🛡️</span> 100% WHOLE MILK GRANDE MOZZARELLA GUARANTEE
          </div>
          Every pizza is tossed by hand and baked on our 865°F stone deck. If your pizza isn’t blistered, crispy, and piping hot upon arrival, Chef Nina will refire it on the spot.
        </div>

      </div>

    </div>

    <!-- Interactive Developer & Demo Simulation Toolbar -->
    <div style="margin-top: 3.5rem; background: #0D0B0A; border: 1px solid var(--vintage-border); border-radius: var(--radius-md); padding: 1.15rem 1.65rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.8rem;">
        <span style="color: var(--mozzarella-gold); font-weight: 800;">[DEV STAGE SIMULATOR]</span>
        <span style="color: var(--text-muted);">Jump stage to test audio &amp; timer triggers:</span>
      </div>

      <div style="display: flex; gap: 0.45rem; flex-wrap: wrap;">
        <button onclick="window.setDemoStage(1)" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">1. Dough Tossed</button>
        <button onclick="window.setDemoStage(2)" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">2. In Stone Oven</button>
        <button onclick="window.setDemoStage(3)" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">3. Boxed &amp; Glazed</button>
        <button onclick="window.setDemoStage(4)" class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">4. Ready Alert!</button>
        <button onclick="window.openOrderModal()" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem; border-color: var(--mozzarella-gold); color: var(--mozzarella-gold);">+ New Mock Order</button>
        <button onclick="window.resetOrder()" class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.76rem; border-color: var(--italian-red); color: #FF6B57;">Reset Order</button>
      </div>
    </div>

  </main>

  <!-- Interactive Mock Order Placement Modal (5 Options + Time-of-Day Surge) -->
  <div id="order-modal" class="modal-overlay" onclick="if(event.target === this) window.closeOrderModal()">
    <div class="order-creator-paper">
      
      <!-- Inner top gingham ribbon -->
      <div style="height: 6px; width: 100%; background: repeating-linear-gradient(90deg, var(--italian-red) 0, var(--italian-red) 12px, #FAF5EE 12px, #FAF5EE 24px, var(--basil-green) 24px, var(--basil-green) 36px, #FAF5EE 36px, #FAF5EE 48px); margin: -2.25rem -2.25rem 1.5rem -2.25rem; width: calc(100% + 4.5rem); border-radius: var(--radius-lg) var(--radius-lg) 0 0;"></div>

      <!-- Modal Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--vintage-border); padding-bottom: 1.25rem; margin-bottom: 1.25rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-red">STEP 1: SELECT ARTISANAL DISH</span>
            <span class="badge badge-gold">STONE DECK &amp; WOOD HEARTH</span>
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 1.85rem; font-weight: 900; color: #FAF5EE; margin: 0.35rem 0 0.2rem;">
            Place Mock Order &amp; Start Kitchen Clock
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
            Select from 5 authentic Italian-American favorites with varied bake times. The kitchen clock dynamically accounts for time-of-day rush hours.
          </p>
        </div>

        <button onclick="window.closeOrderModal()" class="btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; border-radius: var(--radius-full);">
          ✕ Close
        </button>
      </div>

      <!-- Time-of-Day Activity Surge Indicator & Simulator -->
      <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: var(--mozzarella-gold); text-transform: uppercase;">
            🕒 Time-of-Day Restaurant Load Activity
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
            Peak (+10m) | Slow (-10m) | Standard (±0m)
          </div>
        </div>

        <!-- Dynamic Surge Banner Box -->
        <div id="modal-surge-banner" class="surge-indicator-box surge-box-peak">
          <!-- Populated by JS -->
        </div>

        <!-- Time Mode Selector Pills -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
          <div style="font-size: 0.78rem; color: var(--text-secondary);">
            Simulate neighborhood dining rush:
          </div>
          <div class="time-pills-container" style="margin-top: 0;">
            <button class="time-pill-btn active" data-time-mode="auto" onclick="window.setTimeMode('auto')">
              ⚡ Auto (Live Time)
            </button>
            <button class="time-pill-btn" data-time-mode="peak" onclick="window.setTimeMode('peak')">
              🔴 Peak Dinner Rush (7:00 PM / +10m)
            </button>
            <button class="time-pill-btn" data-time-mode="slow" onclick="window.setTimeMode('slow')">
              🟢 Slow Lull (10:30 PM / -10m)
            </button>
            <button class="time-pill-btn" data-time-mode="standard" onclick="window.setTimeMode('standard')">
              🟡 Standard Pace (3:00 PM / ±0m)
            </button>
          </div>
        </div>
      </div>

      <!-- 5 Menu Cooking Option Cards Grid -->
      <div style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 800; color: #FAF5EE; margin-bottom: 0.5rem; display: flex; align-items: gap 0.4rem;">
        <span>🍕</span> Select Cooking Option (5 Dishes):
      </div>

      <div class="menu-options-grid">
        <?php foreach ($MENU_OPTIONS as $optId => $opt): 
          $isSelected = ($optId === 'option-soppressata');
        ?>
          <div class="menu-option-card <?= $isSelected ? 'selected' : '' ?>" data-option-id="<?= htmlspecialchars($opt['id']) ?>" onclick="window.selectOption('<?= htmlspecialchars($opt['id']) ?>')">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span class="option-cook-badge">⏱️ <?= (int)$opt['baseCookMinutes'] ?> MINS</span>
                <span class="font-mono" style="font-weight: 800; color: #FAF5EE; font-size: 1.05rem;">$<?= number_format((float)$opt['price'], 2) ?></span>
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 800; color: #FAF5EE; margin-bottom: 0.35rem;">
                <?= $opt['icon'] ?> <?= htmlspecialchars($opt['name']) ?>
              </h4>
              <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 0.6rem;">
                <?= htmlspecialchars($opt['description']) ?>
              </p>
            </div>
            <span class="badge <?= $optId === 'option-margherita' ? 'badge-green' : ($optId === 'option-soppressata' ? 'badge-gold' : ($optId === 'option-ribeye' ? 'badge-red' : ($optId === 'option-feast' ? 'badge-gold' : 'badge-muted'))) ?>" style="align-self: flex-start; font-size: 0.65rem;">
              <?= htmlspecialchars($opt['badge']) ?>
            </span>
          </div>
        <?php endforeach; ?>
      </div>

      <!-- Order Calculation Summary & Fire Button -->
      <div style="background: #0D0B0A; border: 1px solid var(--vintage-border-gold); border-radius: var(--radius-md); padding: 1.35rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem;">
        <div>
          <div style="font-size: 0.76rem; color: var(--text-muted); font-family: var(--font-mono);">
            SELECTED: <strong id="modal-summary-dish" style="color: #FAF5EE;">16" Jim &amp; Nina's Hot Honey Pepperoni Cup Special</strong>
          </div>
          <div style="font-size: 0.88rem; color: #FAF5EE; margin-top: 0.25rem;">
            Base Cook: <strong id="modal-summary-basetime">18 mins</strong> | 
            Surge: <strong id="modal-summary-surge" style="color: #FF6B57;">+10 mins (Peak)</strong> | 
            Ready In: <strong id="modal-summary-finaltime" style="color: var(--mozzarella-gold); font-size: 1.05rem; font-family: var(--font-serif);">~28 minutes</strong>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <div style="text-align: right;">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">TOTAL INCL. TAX/TIP:</div>
            <div id="modal-summary-total" class="font-mono" style="font-size: 1.4rem; font-weight: 900; color: var(--mozzarella-gold);">$34.12</div>
          </div>
          <button onclick="window.fireOrder()" class="btn-primary" style="padding: 0.85rem 1.75rem; font-size: 0.95rem; box-shadow: 0 4px 20px var(--italian-red-glow);">
            🔥 Fire Order &amp; Start Clock
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- Printable Thermal Guest Check Receipt Modal -->
  <div id="receipt-modal" class="modal-overlay" onclick="if(event.target === this) window.closeReceiptModal()">
    <div class="receipt-paper">
      
      <!-- Checkered top ribbon on paper -->
      <div style="height: 6px; width: 100%; background: repeating-linear-gradient(90deg, var(--italian-red) 0, var(--italian-red) 10px, #FFFDF9 10px, #FFFDF9 20px, var(--basil-green) 20px, var(--basil-green) 30px, #FFFDF9 30px, #FFFDF9 40px); margin: -2.25rem -2rem 1.25rem -2rem; width: calc(100% + 4rem); border-radius: 8px 8px 0 0;"></div>

      <div style="text-align: center; margin-bottom: 1rem;">
        <h2 style="font-family: var(--font-serif); font-size: 1.65rem; font-weight: 900; margin: 0; color: #1A1816; letter-spacing: -0.01em;">
          <?= htmlspecialchars(APP_NAME) ?>
        </h2>
        <div style="font-size: 0.76rem; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.15rem;">
          <?= htmlspecialchars(APP_TAGLINE) ?>
        </div>
        <div style="font-size: 0.74rem; color: #666; margin-top: 0.2rem;">
          <?= htmlspecialchars($order->store['address'] ?? '142 Mulberry Street, Little Italy') ?><br />
          Tel: <?= htmlspecialchars($order->store['phone'] ?? '(555) 749-NINA') ?> // Est. 1974
        </div>
      </div>

      <div class="receipt-divider"></div>

      <div style="font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
        <span>CHECK: <strong id="receipt-order-num"><?= htmlspecialchars($order->orderNumber) ?></strong></span>
        <span id="receipt-placed-time"><?= htmlspecialchars($order->placedAtFormatted) ?></span>
      </div>
      <div style="font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span>GUEST: <strong><?= htmlspecialchars($order->customer['name']) ?></strong></span>
        <span><?= htmlspecialchars($order->customer['shelf']) ?></span>
      </div>

      <div class="receipt-divider"></div>

      <!-- Receipt items -->
      <div id="modal-receipt-items" style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
        <?php foreach ($order->items as $item): ?>
          <div>
            <div style="display: flex; justify-content: space-between; font-weight: 800;">
              <span><?= (int)$item['quantity'] ?>× <?= htmlspecialchars($item['name']) ?></span>
              <span>$<?= number_format((float)$item['totalPrice'], 2) ?></span>
            </div>
            <?php if (!empty($item['modifiers'])): ?>
              <?php foreach ($item['modifiers'] as $m): ?>
                <div style="font-size: 0.72rem; color: #555; padding-left: 0.5rem;">* <?= htmlspecialchars($m['value']) ?></div>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="receipt-divider"></div>

      <div style="font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;">
        <div style="display: flex; justify-content: space-between;">
          <span>Subtotal</span>
          <span id="modal-subtotal">$<?= number_format((float)$order->pricing['subtotal'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>NYC Sales Tax (8.75%)</span>
          <span id="modal-tax">$<?= number_format((float)$order->pricing['tax'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Kitchen &amp; Staff Tip (20%)</span>
          <span id="modal-tip">$<?= number_format((float)$order->pricing['tip'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 1.15rem; margin-top: 0.5rem; border-top: 2px solid #1A1816; padding-top: 0.5rem;">
          <span>TOTAL</span>
          <span id="modal-total">$<?= number_format((float)$order->pricing['total'], 2) ?></span>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <div style="text-align: center; margin: 0.85rem 0;">
        <div class="receipt-stamp">★ AUTHENTIC 1974 ★</div>
      </div>

      <div style="text-align: center; font-size: 0.74rem; color: #666; line-height: 1.4;">
        Grazie mille for supporting local family-owned pizza!<br />
        Baked fresh at 865°F on stone deck hearth.
      </div>

      <!-- Action buttons -->
      <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;" class="no-print">
        <button onclick="window.printReceipt()" class="btn-primary" style="flex: 1; padding: 0.65rem;">
          🖨️ Print Guest Check
        </button>
        <button onclick="window.closeReceiptModal()" class="btn-secondary" style="flex: 1; padding: 0.65rem; color: #1A1816; border-color: #C4BDB0;">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- JavaScript Audio & Live Tracking Engine -->
  <script src="./assets/js/audio.js"></script>
  <script src="./assets/js/tracker.js"></script>

</body>
</html>
