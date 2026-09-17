<?php
/**
 * Order Entity Model
 */

class Order {
    public string $orderNumber;
    public int $placedAt;              // Immutable epoch timestamp (in milliseconds)
    public string $placedAtFormatted;   // Human-readable string e.g. "6:42 PM"
    public int $targetReadyAt;          // Absolute target readiness epoch (in milliseconds)
    public int $totalDurationMs;        // Total preparation duration (ms)
    public int $baseCookMinutes;        // Base cook time for selected dish (mins)
    public int $surgeAdjustmentMinutes; // Time-of-day surge (+10, -10, or 0)
    public string $surgeStatus;         // 'PEAK', 'SLOW', or 'STANDARD'
    public string $surgeLabel;          // Human description e.g. "Peak Dinner Rush (+10 mins)"
    public string $surgeMarker;         // Visual badge text e.g. "🔥 PEAK RUSH (+10m)"
    public string $selectedOptionId;    // e.g. "option-soppressata"
    public array $customer;
    public array $store;
    public array $items;
    public array $pricing;
    public int $currentStageId;

    public function __construct(array $data) {
        $this->orderNumber = $data['orderNumber'] ?? '#FG-' . rand(10000, 99999);
        $this->placedAt = (int)($data['placedAt'] ?? (time() * 1000));
        $this->placedAtFormatted = $data['placedAtFormatted'] ?? date('g:i A', (int)($this->placedAt / 1000));
        $this->baseCookMinutes = (int)($data['baseCookMinutes'] ?? 18);
        $this->surgeAdjustmentMinutes = (int)($data['surgeAdjustmentMinutes'] ?? 0);
        $this->surgeStatus = $data['surgeStatus'] ?? 'STANDARD';
        $this->surgeLabel = $data['surgeLabel'] ?? 'Standard Kitchen Pace (±0 mins)';
        $this->surgeMarker = $data['surgeMarker'] ?? '🟡 STANDARD PACE (±0m)';
        $this->selectedOptionId = $data['selectedOptionId'] ?? 'option-soppressata';
        
        $calcDurationMs = max(5 * 60 * 1000, ($this->baseCookMinutes + $this->surgeAdjustmentMinutes) * 60 * 1000);
        $this->totalDurationMs = (int)($data['totalDurationMs'] ?? $calcDurationMs);
        $this->targetReadyAt = (int)($data['targetReadyAt'] ?? ($this->placedAt + $this->totalDurationMs));
        
        $this->customer = $data['customer'] ?? [];
        $this->store = $data['store'] ?? [];
        $this->items = $data['items'] ?? [];
        $this->pricing = $data['pricing'] ?? [];
        $this->currentStageId = (int)($data['currentStageId'] ?? 1);
    }

    /**
     * Compute remaining milliseconds from current time
     */
    public function getRemainingMs(): int {
        $nowMs = (int)(microtime(true) * 1000);
        return max(0, $this->targetReadyAt - $nowMs);
    }

    /**
     * Compute elapsed progress ratio between 0.0 and 1.0
     */
    public function getProgressRatio(): float {
        $nowMs = (int)(microtime(true) * 1000);
        $elapsed = $nowMs - $this->placedAt;
        if ($this->totalDurationMs <= 0) return 1.0;
        return max(0.0, min(1.0, $elapsed / $this->totalDurationMs));
    }

    /**
     * Format target ready time
     */
    public function getTargetReadyFormatted(): string {
        return date('g:i A', (int)($this->targetReadyAt / 1000));
    }

    public function toArray(): array {
        return [
            'orderNumber' => $this->orderNumber,
            'placedAt' => $this->placedAt,
            'placedAtFormatted' => $this->placedAtFormatted,
            'targetReadyAt' => $this->targetReadyAt,
            'totalDurationMs' => $this->totalDurationMs,
            'baseCookMinutes' => $this->baseCookMinutes,
            'surgeAdjustmentMinutes' => $this->surgeAdjustmentMinutes,
            'surgeStatus' => $this->surgeStatus,
            'surgeLabel' => $this->surgeLabel,
            'surgeMarker' => $this->surgeMarker,
            'selectedOptionId' => $this->selectedOptionId,
            'customer' => $this->customer,
            'store' => $this->store,
            'items' => $this->items,
            'pricing' => $this->pricing,
            'currentStageId' => $this->currentStageId
        ];
    }
}
