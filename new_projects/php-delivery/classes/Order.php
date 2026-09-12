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
    public array $customer;
    public array $store;
    public array $items;
    public array $pricing;
    public int $currentStageId;

    public function __construct(array $data) {
        $this->orderNumber = $data['orderNumber'] ?? '#FG-84920';
        $this->placedAt = (int)($data['placedAt'] ?? (time() * 1000));
        $this->placedAtFormatted = $data['placedAtFormatted'] ?? date('g:i A', (int)($this->placedAt / 1000));
        $this->totalDurationMs = (int)($data['totalDurationMs'] ?? (22 * 60 * 1000));
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
            'customer' => $this->customer,
            'store' => $this->store,
            'items' => $this->items,
            'pricing' => $this->pricing,
            'currentStageId' => $this->currentStageId
        ];
    }
}
