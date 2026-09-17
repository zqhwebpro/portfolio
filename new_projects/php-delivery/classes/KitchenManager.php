<?php
/**
 * Kitchen Manager & Readiness Calculation Engine
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/Order.php';

class KitchenManager {
    /**
     * Resolve Time-of-Day Surge and Activity Marker
     * 
     * Peak Rush: +10 mins (Lunch 11:30-13:30, Dinner 17:30-20:30)
     * Slow Lull: -10 mins (Night/Morning 22:00-11:00, Afternoon 14:30-16:30)
     * Standard: 0 mins
     */
    public static function resolveTimeOfDaySurge(?int $epochMs = null, string $forcedMode = 'auto'): array {
        if ($forcedMode === 'peak') {
            return [
                'status' => 'PEAK',
                'adjustmentMinutes' => 10,
                'marker' => '🔥 PEAK RUSH (+10m)',
                'label' => 'Peak Dinner Rush (+10 mins oven queue surge)',
                'description' => 'Wood ovens running at full capacity during peak dining rush.',
                'badgeClass' => 'badge-red'
            ];
        }

        if ($forcedMode === 'slow') {
            return [
                'status' => 'SLOW',
                'adjustmentMinutes' => -10,
                'marker' => '⚡ OFF-PEAK EXPRESS (-10m)',
                'label' => 'Off-Peak Speed Lull (-10 mins express kitchen boost)',
                'description' => 'Direct hearth access with zero queue backlog.',
                'badgeClass' => 'badge-green'
            ];
        }

        if ($forcedMode === 'standard') {
            return [
                'status' => 'STANDARD',
                'adjustmentMinutes' => 0,
                'marker' => '🟡 STANDARD PACE (±0m)',
                'label' => 'Standard Kitchen Pace (±0 mins)',
                'description' => 'Moderate dining volume with nominal firing times.',
                'badgeClass' => 'badge-gold'
            ];
        }

        // Auto: Detect based on current time
        $timestamp = $epochMs ? (int)($epochMs / 1000) : time();
        $hour = (int)date('G', $timestamp);
        $minute = (int)date('i', $timestamp);
        $timeDecimal = $hour + ($minute / 60.0);

        // Peak Windows: Lunch 11:30-13:30 (11.5-13.5), Dinner 17:30-20:30 (17.5-20.5)
        if (($timeDecimal >= 11.5 && $timeDecimal <= 13.5) || ($timeDecimal >= 17.5 && $timeDecimal <= 20.5)) {
            return [
                'status' => 'PEAK',
                'adjustmentMinutes' => 10,
                'marker' => '🔥 PEAK RUSH (+10m)',
                'label' => 'Peak Rush Hour (+10 mins oven queue surge)',
                'description' => 'High restaurant activity detected. Wood ovens at peak queue capacity.',
                'badgeClass' => 'badge-red'
            ];
        }

        // Slow Lull Windows: Late night/morning 22:00-11:00 (>=22.0 or <11.0), Afternoon 14:30-16:30 (14.5-16.5)
        if ($timeDecimal >= 22.0 || $timeDecimal < 11.0 || ($timeDecimal >= 14.5 && $timeDecimal <= 16.5)) {
            return [
                'status' => 'SLOW',
                'adjustmentMinutes' => -10,
                'marker' => '⚡ OFF-PEAK EXPRESS (-10m)',
                'label' => 'Off-Peak Lull (-10 mins express kitchen boost)',
                'description' => 'Quiet dining hours detected. Priority hearth firing active.',
                'badgeClass' => 'badge-green'
            ];
        }

        // Default: Standard Pace
        return [
            'status' => 'STANDARD',
            'adjustmentMinutes' => 0,
            'marker' => '🟡 STANDARD PACE (±0m)',
            'label' => 'Standard Kitchen Pace (±0 mins)',
            'description' => 'Standard kitchen flow with nominal firing and prep times.',
            'badgeClass' => 'badge-gold'
        ];
    }

    /**
     * Compute current kitchen preparation stage from progress ratio
     */
    public static function resolveStage(Order $order, array $stagesConfig): int {
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
