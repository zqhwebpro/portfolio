<?php
/**
 * FORNO & GRATE // Artisanal Wood-Fired Pizzeria & Grill
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
  <title>Live Take-Out Tracker & Receipt // <?= htmlspecialchars(APP_NAME) ?></title>
  <meta name="description" content="Live take-out order tracker, wood oven status, and immutable receipt dashboard for <?= htmlspecialchars(APP_NAME) ?>." />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23111215'/><circle cx='50' cy='50' r='40' fill='%23D9381E'/><polygon points='50,18 80,78 20,78' fill='%23F5A623'/></svg>" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">
  
  <!-- Design System CSS -->
  <link rel="stylesheet" href="./assets/css/style.css" />
  
  <!-- Server-Injected Initial State -->
  <script>
    window.ORDER_DATA = <?= $orderJson ?>;
  </script>
</head>
<body>

  <!-- Top Telemetry Header -->
  <header style="background: rgba(24, 26, 32, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--charcoal-border); position: sticky; top: 0; z-index: 50;">
    <div style="background: #0B0C0E; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 0.35rem 1.5rem; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
      <div style="display: flex; align-items: center; gap: 1.25rem;">
        <span style="color: var(--ember-red); font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
          🔥 OVEN: <?= htmlspecialchars($order->store['ovenTemp']) ?> (<?= htmlspecialchars($order->store['woodSource']) ?>)
        </span>
        <span style="color: var(--basil-green);">
          ⏱️ ORDER CREATED: <strong><?= htmlspecialchars($order->placedAtFormatted) ?></strong>
        </span>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="color: var(--honey-gold); font-weight: 600;">
          EXPRESS PICKUP: ACTIVE
        </span>
        <button id="sfx-toggle-btn" onclick="window.KitchenAudio && window.KitchenAudio.toggleMute()" class="btn-secondary" style="padding: 0.2rem 0.6rem; font-size: 0.72rem; border-radius: var(--radius-full);">
          SFX ON
        </button>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem clamp(1rem, 3vw, 2rem); flex-wrap: wrap; gap: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <div style="width: 42px; height: 42px; background: linear-gradient(135deg, var(--ember-red), #991B1B); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px var(--ember-red-glow);">
          <span style="font-size: 1.4rem;">🔥</span>
        </div>
        <div>
          <h1 style="font-family: var(--font-display); font-size: clamp(1.15rem, 2.2vw, 1.45rem); font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF; margin: 0; line-height: 1.1;">
            <?= htmlspecialchars(APP_NAME) ?>
          </h1>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--honey-gold); font-weight: 600; letter-spacing: 0.04em;">
            <?= htmlspecialchars(APP_TAGLINE) ?>
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <a href="../index.html" class="btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;">
          ← Back to Projects
        </a>
      </div>
    </div>
  </header>

  <!-- Main Dashboard Content -->
  <main class="container" style="padding-top: clamp(1.5rem, 3vw, 2.5rem); padding-bottom: 5rem;">
    
    <div class="dashboard-grid">
      
      <!-- LEFT COLUMN: Live Operational Progress & Directives -->
      <div style="display: flex; flexDirection: column; gap: 1.5rem;">

        <!-- 1. Live Countdown Status Hero Card -->
        <div id="countdown-hero-card" class="pizzeria-card <?= $isReady ? 'animate-ready-pulse' : '' ?>" style="padding: clamp(1.5rem, 4vw, 2.25rem); border: <?= $isReady ? '1px solid var(--basil-green)' : '1px solid var(--charcoal-border)' ?>; background: <?= $isReady ? 'linear-gradient(145deg, rgba(27, 138, 90, 0.12), rgba(24, 26, 32, 0.95))' : 'linear-gradient(145deg, rgba(217, 56, 30, 0.08), rgba(24, 26, 32, 0.98))' ?>; overflow: hidden;">
          
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span id="hero-status-badge" class="badge <?= $isReady ? 'badge-green' : 'badge-red' ?>">
                <?= $isReady ? 'ORDER READY ON COUNTER' : 'LIVE STATUS: ' . strtoupper($KITCHEN_STAGES[$currentStageId]['name']) ?>
              </span>
              <span class="badge badge-muted">
                <?= htmlspecialchars($order->customer['pickupType']) ?>
              </span>
            </div>

            <div class="font-mono" style="font-size: 0.88rem; font-weight: 700; color: var(--honey-gold); background: rgba(245, 166, 35, 0.1); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid rgba(245, 166, 35, 0.25);">
              ORDER <?= htmlspecialchars($order->orderNumber) ?>
            </div>
          </div>

          <!-- Center Grid: Text and Circular SVG Gauge -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 1.5rem; align-items: center; margin-bottom: 1.75rem;">
            <div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
                ESTIMATED TAKE-OUT READINESS
              </div>
              <h2 id="hero-title-text" style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 900; line-height: 1.1; color: #FFFFFF; margin-bottom: 0.65rem;">
                <?php if ($isReady): ?>
                  <span style="color: var(--basil-green);">Ready for Pickup!</span>
                <?php else: ?>
                  Ready in <span style="color: var(--honey-gold);">~<?= max(1, (int)ceil($remainingMs / 60000)) ?> mins</span>
                <?php endif; ?>
              </h2>
              <p id="hero-subtext" style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0; max-width: 400px;">
                <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['description']) ?>
              </p>
            </div>

            <!-- Circular Progress Ring -->
            <div style="display: flex; justify-content: center; position: relative;">
              <div style="position: relative; width: 170px; height: 170px;">
                <svg width="170" height="170" style="transform: rotate(-90deg);">
                  <circle cx="85" cy="85" r="75" fill="transparent" stroke="rgba(255, 255, 255, 0.07)" stroke-width="10" />
                  <circle id="countdown-svg-circle" cx="85" cy="85" r="75" fill="transparent" stroke="<?= $isReady ? 'var(--basil-green)' : 'var(--ember-red)' ?>" stroke-width="10" stroke-dasharray="471.24" stroke-dashoffset="<?= (1 - $progressRatio) * 471.24 ?>" stroke-linecap="round" style="transition: stroke-dashoffset 0.5s ease;" />
                </svg>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                  <span id="countdown-digits" class="font-mono" style="font-size: 1.85rem; font-weight: 900; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1;">
                    <?= KitchenManager::formatCountdown($remainingMs) ?>
                  </span>
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 0.25rem;">
                    MIN : SEC
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Immutable Metadata Strip -->
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 1rem; font-family: var(--font-mono); font-size: 0.82rem;">
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">PLACED TIME (IMMUTABLE):</div>
              <div style="color: #FFFFFF; font-weight: 800;">
                ⏱️ <?= htmlspecialchars($order->placedAtFormatted) ?>
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">TARGET PICKUP WINDOW:</div>
              <div style="color: #FFFFFF; font-weight: 800;">
                <?= htmlspecialchars($order->getTargetReadyFormatted()) ?>
              </div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">EXPRESS SHELF:</div>
              <div style="color: var(--honey-gold); font-weight: 800;">
                <?= htmlspecialchars($order->customer['shelf']) ?>
              </div>
            </div>
          </div>

        </div>

        <!-- 2. Active Kitchen Pipeline Visualizer -->
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.75rem);">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--charcoal-border); padding-bottom: 0.85rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.1rem;">👨‍🍳</span>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #FFFFFF; margin: 0;">
                KITCHEN HEARTH PIPELINE
              </h3>
            </div>
            <span class="badge badge-gold">
              WOOD-FIRED PREPARATION
            </span>
          </div>

          <!-- Progress Rail & 4 Stage Nodes -->
          <div style="position: relative; margin-bottom: 1.75rem; padding: 0 0.5rem;">
            <div style="position: absolute; top: 24px; left: 30px; right: 30px; height: 4px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; z-index: 1;">
              <div id="pipeline-rail-fill" style="height: 100%; width: <?= min(100, max(5, $progressRatio * 100)) ?>%; background: linear-gradient(90deg, var(--honey-gold), var(--ember-red)); border-radius: 2px; transition: width 0.4s ease;"></div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); position: relative; z-index: 2;">
              <?php foreach ($KITCHEN_STAGES as $s): 
                $isCompleted = $currentStageId > $s['id'];
                $isActive = $currentStageId === $s['id'];
              ?>
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 4px;">
                  <div id="stage-node-<?= $s['id'] ?>" class="<?= $isActive && $s['id'] === 2 ? 'animate-oven-active' : '' ?>" style="width: 48px; height: 48px; border-radius: 50%; background: <?= $isCompleted ? 'var(--basil-green)' : ($isActive ? ($s['id'] === 2 ? 'var(--ember-red)' : 'var(--honey-gold)') : 'var(--bg-surface-elevated)') ?>; border: 2px solid <?= $isCompleted ? 'var(--basil-green)' : ($isActive ? '#FFFFFF' : 'var(--charcoal-border)') ?>; display: flex; align-items: center; justify-content: center; margin-bottom: 0.65rem; transition: all 0.3s ease; font-size: 1.2rem;">
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
                </div>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Active Stage Callout Narration -->
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 1rem 1.25rem; display: flex; align-items: flex-start; gap: 1rem;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: var(--ember-red-glow); border: 1px solid var(--ember-red); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.1rem;">
              🔥
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span id="stage-callout-title" class="font-mono" style="font-size: 0.78rem; font-weight: 800; color: var(--honey-gold);">
                  STAGE <?= $currentStageId ?> OF 4: <?= strtoupper($KITCHEN_STAGES[$currentStageId]['name']) ?>
                </span>
                <span id="stage-callout-tag" class="badge badge-muted" style="font-size: 0.65rem;">
                  <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['tagline']) ?>
                </span>
              </div>
              <p id="stage-callout-desc" style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
                <?= htmlspecialchars($KITCHEN_STAGES[$currentStageId]['description']) ?>
              </p>
            </div>
          </div>
        </div>

        <!-- 3. Direct Pickup Directives & Navigation Card -->
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.75rem);">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--charcoal-border); padding-bottom: 0.85rem; margin-bottom: 1.25rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.1rem;">📍</span>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #FFFFFF; margin: 0;">
                STORE PICKUP &amp; CURBSIDE INSTRUCTIONS
              </h3>
            </div>
            <span class="badge badge-green">
              EXPRESS READY
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 1rem;">
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--honey-gold); font-weight: 700; margin-bottom: 0.35rem;">
                OPTION A: IN-STORE EXPRESS SHELF
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
                Walk directly to the thermal pickup cubby marked <strong style="color: #FFF;"><?= htmlspecialchars($order->customer['shelf']) ?></strong> near the main counter. Grab your insulated tote and bypass the register.
              </p>
            </div>

            <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 1rem;">
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--basil-green); font-weight: 700; margin-bottom: 0.35rem;">
                OPTION B: CURBSIDE DELIVERY
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
                Pull into <strong style="color: #FFF;">Curbside Bay #3</strong> in the rear alley. Our expediters will bring the order directly to your vehicle (<?= htmlspecialchars($order->customer['vehicle']) ?>).
              </p>
            </div>
          </div>

          <!-- Actions: Google Maps & Store Details -->
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="https://maps.google.com/?q=<?= urlencode($order->store['address']) ?>" target="_blank" rel="noopener" class="btn-primary" style="font-size: 0.85rem; padding: 0.65rem 1.25rem;">
              🗺️ Open Google Maps Directions
            </a>
            <a href="tel:<?= preg_replace('/[^0-9]/', '', $order->store['phone']) ?>" class="btn-secondary">
              📞 Call Kitchen (<?= htmlspecialchars($order->store['phone']) ?>)
            </a>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Itemized Collapsible Order Receipt -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div class="pizzeria-card" style="padding: clamp(1.25rem, 3vw, 1.75rem);">
          <!-- Order Reference Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--charcoal-border); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div>
              <div class="font-mono" style="font-size: 0.75rem; color: var(--text-muted);">
                OFFICIAL ORDER RECEIPT
              </div>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: #FFFFFF; margin: 0.15rem 0;">
                <?= htmlspecialchars($order->orderNumber) ?>
              </h3>
              <div class="font-mono" style="font-size: 0.75rem; color: var(--text-secondary);">
                Customer: <?= htmlspecialchars($order->customer['name']) ?>
              </div>
            </div>

            <button onclick="window.openReceiptModal()" class="btn-secondary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;">
              🖨️ View / Print
            </button>
          </div>

          <!-- Itemized List -->
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            <?php foreach ($order->items as $item): ?>
              <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <div style="font-weight: 700; color: #FFFFFF; font-size: 0.92rem;">
                    <?= (int)$item['quantity'] ?>× <?= htmlspecialchars($item['name']) ?>
                  </div>
                  <div class="font-mono" style="font-weight: 800; color: var(--honey-gold); font-size: 0.92rem;">
                    $<?= number_format($item['totalPrice'], 2) ?>
                  </div>
                </div>

                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.4rem; line-height: 1.3;">
                  <?= htmlspecialchars($item['description']) ?>
                </div>

                <?php if (!empty($item['modifiers'])): ?>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <?php foreach ($item['modifiers'] as $mod): ?>
                      <span class="badge badge-muted" style="font-size: 0.68rem; padding: 0.15rem 0.45rem;">
                        <?= htmlspecialchars($mod['value']) ?>
                      </span>
                    <?php endforeach; ?>
                  </div>
                <?php endif; ?>
              </div>
            <?php endforeach; ?>
          </div>

          <!-- Pricing Calculations -->
          <div style="border-top: 1px solid var(--charcoal-border); padding-top: 1rem; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Subtotal</span>
              <span>$<?= number_format($order->pricing['subtotal'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Local Sales Tax (8.75%)</span>
              <span>$<?= number_format($order->pricing['tax'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Kitchen Staff Gratitude Tip (20%)</span>
              <span>$<?= number_format($order->pricing['tip'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #FFFFFF; font-weight: 900; font-size: 1.15rem; border-top: 1px dashed var(--charcoal-border); padding-top: 0.75rem; margin-top: 0.25rem;">
              <span>TOTAL PAID</span>
              <span style="color: var(--honey-gold);">$<?= number_format($order->pricing['total'], 2) ?></span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem;">
              <span>Payment Method</span>
              <span><?= htmlspecialchars($order->pricing['paymentMethod']) ?></span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            <button onclick="window.openReceiptModal()" class="btn-primary" style="width: 100%;">
              📄 Export Official PDF / Receipt
            </button>
            <button onclick="alert('All 4 items have been added back to your cart!')" class="btn-secondary" style="width: 100%;">
              🔁 Reorder This Exact Meal
            </button>
          </div>
        </div>

        <!-- Store Guarantee & Freshness Policy -->
        <div class="pizzeria-card-elevated" style="padding: 1.25rem; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4;">
          <div style="font-weight: 700; color: #FFFFFF; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            🛡️ 100% HEARTH FRESHNESS GUARANTEE
          </div>
          Every pizza is fired to order at 865°F over seasoned white oak. If your order isn't blistered and hot upon arrival, we will refire it on the spot.
        </div>

      </div>

    </div>

    <!-- Interactive Developer & Demo Simulation Toolbar -->
    <div style="margin-top: 3rem; background: #0B0C0E; border: 1px solid var(--charcoal-border); border-radius: var(--radius-md); padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.8rem;">
        <span style="color: var(--honey-gold); font-weight: 800;">[DEV STAGE SIMULATOR]</span>
        <span style="color: var(--text-muted);">Jump stage to preview audio &amp; visual triggers:</span>
      </div>

      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        <button onclick="window.setDemoStage(1)" class="btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;">1. Queued</button>
        <button onclick="window.setDemoStage(2)" class="btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;">2. In Oven</button>
        <button onclick="window.setDemoStage(3)" class="btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;">3. Boxed</button>
        <button onclick="window.setDemoStage(4)" class="btn-primary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem;">4. Ready Alert!</button>
        <button onclick="window.resetOrder()" class="btn-secondary" style="padding: 0.3rem 0.7rem; font-size: 0.75rem; border-color: var(--ember-red); color: var(--ember-red);">Reset Order</button>
      </div>
    </div>

  </main>

  <!-- Printable Thermal Receipt Modal -->
  <div id="receipt-modal" class="modal-overlay" onclick="if(event.target === this) window.closeReceiptModal()">
    <div class="receipt-paper">
      <div style="text-align: center; margin-bottom: 1rem;">
        <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; margin: 0;">
          <?= htmlspecialchars(APP_NAME) ?>
        </h2>
        <div style="font-size: 0.75rem; color: #555; margin-top: 0.2rem;">
          <?= htmlspecialchars($order->store['address']) ?><br />
          <?= htmlspecialchars($order->store['phone']) ?>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <div style="font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
        <span>ORDER: <strong><?= htmlspecialchars($order->orderNumber) ?></strong></span>
        <span><?= htmlspecialchars($order->placedAtFormatted) ?></span>
      </div>
      <div style="font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span>CUSTOMER: <strong><?= htmlspecialchars($order->customer['name']) ?></strong></span>
        <span><?= htmlspecialchars($order->customer['shelf']) ?></span>
      </div>

      <div class="receipt-divider"></div>

      <!-- Receipt items -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
        <?php foreach ($order->items as $item): ?>
          <div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;">
              <span><?= (int)$item['quantity'] ?>× <?= htmlspecialchars($item['name']) ?></span>
              <span>$<?= number_format($item['totalPrice'], 2) ?></span>
            </div>
            <?php foreach ($item['modifiers'] as $mod): ?>
              <div style="font-size: 0.72rem; color: #555; padding-left: 0.5rem;">
                * <?= htmlspecialchars($mod['value']) ?>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="receipt-divider"></div>

      <div style="font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;">
        <div style="display: flex; justify-content: space-between;">
          <span>Subtotal</span>
          <span>$<?= number_format($order->pricing['subtotal'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Sales Tax (8.75%)</span>
          <span>$<?= number_format($order->pricing['tax'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Kitchen Tip (20%)</span>
          <span>$<?= number_format($order->pricing['tip'], 2) ?></span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 1.1rem; margin-top: 0.5rem; border-top: 1px solid #000; padding-top: 0.5rem;">
          <span>TOTAL</span>
          <span>$<?= number_format($order->pricing['total'], 2) ?></span>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <div style="text-align: center; font-size: 0.75rem; color: #666; margin-top: 1rem;">
        Thank you for supporting artisanal hearth pizza.<br />
        Fired fresh at 865°F over White Oak.
      </div>

      <!-- Action buttons -->
      <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;" class="no-print">
        <button onclick="window.printReceipt()" class="btn-primary" style="flex: 1; padding: 0.6rem;">
          🖨️ Print Receipt
        </button>
        <button onclick="window.closeReceiptModal()" class="btn-secondary" style="flex: 1; padding: 0.6rem;">
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
