<?php
/**
 * Kitchen Manager & Readiness Calculation Engine
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/Order.php';

class KitchenManager {
    /**
     * Compute current kitchen preparation stage from progress ratio
     */
    public static function resolveStage(Order $order, array $stagesConfig): int {
        // If explicitly set to a fixed stage (e.g. via demo control), return it
        if ($order->currentStageId > 0 && $order->currentStageId <= 4) {
            // Check if automatic progression is active
            $ratio = $order->getProgressRatio();
            if ($ratio >= 1.0) return 4;
            if ($ratio >= 0.70) return 3;
            if ($ratio >= 0.25) return 2;
            return 1;
        }

        $ratio = $order->getProgressRatio();
        if ($ratio >= 1.0) return 4;
        if ($ratio >= 0.70) return 3;
        if ($ratio >= 0.25) return 2;
        return 1;
    }

    /**
     * Format milliseconds into MM:SS countdown format
     */
    public static function formatCountdown(int $ms): string {
        if ($ms <= 0) return '00:00';
        $totalSecs = (int)floor($ms / 1000);
        $minutes = (int)floor($totalSecs / 60);
        $seconds = $totalSecs % 60;
        return sprintf('%02d:%02d', $minutes, $seconds);
    }
}
