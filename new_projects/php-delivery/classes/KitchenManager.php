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
                'marker' => '🔥 PEAK DINNER RUSH (+10m)',
                'label' => 'Peak Dinner Rush (+10 mins stone deck queue surge)',
                'description' => 'Full house in the dining room! Ovens running at maximum capacity.',
                'badgeClass' => 'badge-red'
            ];
        }

        if ($forcedMode === 'slow') {
            return [
                'status' => 'SLOW',
                'adjustmentMinutes' => -10,
                'marker' => '⚡ OFF-PEAK EXPRESS (-10m)',
                'label' => 'Off-Peak Speed Lull (-10 mins express oven boost)',
                'description' => 'Quiet neighborhood hours. Pizzaiolo fires your pie immediately on hot deck.',
                'badgeClass' => 'badge-green'
            ];
        }

        if ($forcedMode === 'standard') {
            return [
                'status' => 'STANDARD',
                'adjustmentMinutes' => 0,
                'marker' => '🟡 STANDARD KITCHEN PACE (±0m)',
                'label' => 'Standard Kitchen Pace (±0 mins)',
                'description' => 'Smooth kitchen flow with nominal stone deck firing times.',
                'badgeClass' => 'badge-gold'
            ];
        }

        // Auto: Detect based on current time
        $timestamp = $epochMs ? (int)($epochMs / 1000) : time();
        $hour = (int)date('G', $timestamp);
        $minute = (int)date('i', $timestamp);
        $timeDecimal = $hour + ($minute / 60.0);

        // Peak Windows: Lunch 11:30-13:30 (11.5-13.5), Dinner 17:30-20:30 (17.5-20.5)
        if (($timeDecimal >= 11.5 && timeDecimal <= 13.5) || ($timeDecimal >= 17.5 && timeDecimal <= 20.5)) {
            return [
                'status' => 'PEAK',
                'adjustmentMinutes' => 10,
                'marker' => '🔥 PEAK DINNER RUSH (+10m)',
                'label' => 'Peak Rush Hour (+10 mins stone deck queue surge)',
                'description' => 'Neighborhood dinner rush active. Wood ovens firing at maximum capacity.',
                'badgeClass' => 'badge-red'
            ];
        }

        // Slow Lull Windows: Late night/morning 22:00-11:00 (>=22.0 or <11.0), Afternoon 14:30-16:30 (14.5-16.5)
        if ($timeDecimal >= 22.0 || $timeDecimal < 11.0 || ($timeDecimal >= 14.5 && timeDecimal <= 16.5)) {
            return [
                'status' => 'SLOW',
                'adjustmentMinutes' => -10,
                'marker' => '⚡ OFF-PEAK EXPRESS (-10m)',
                'label' => 'Off-Peak Lull (-10 mins express oven boost)',
                'description' => 'Quiet neighborhood lull. Fresh dough fires immediately on hot stone deck.',
                'badgeClass' => 'badge-green'
            ];
        }

        // Default: Standard Pace
        return [
            'status' => 'STANDARD',
            'adjustmentMinutes' => 0,
            'marker' => '🟡 STANDARD KITCHEN PACE (±0m)',
            'label' => 'Standard Kitchen Pace (±0 mins)',
            'description' => 'Nominal stone deck prep and firing workflow.',
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
