export type HapticKind = 'selection' | 'impact' | 'success' | 'warning' | 'error';

/**
 * Deliberately opt-in: visual controls never vibrate unless a semantic action
 * requests it. Native Capacitor haptics can replace this adapter later without
 * leaking platform calls into feature screens.
 */
export const haptics = {
  trigger(kind: HapticKind) {
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
    const pattern: Record<HapticKind, number | number[]> = {
      selection: 8,
      impact: 14,
      success: [10, 18, 18],
      warning: [18, 22, 18],
      error: [24, 28, 24],
    };
    navigator.vibrate(pattern[kind]);
  },
  selection() { this.trigger('selection'); },
  impact() { this.trigger('impact'); },
  success() { this.trigger('success'); },
  warning() { this.trigger('warning'); },
  error() { this.trigger('error'); },
};
