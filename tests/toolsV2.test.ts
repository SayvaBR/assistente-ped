import { describe, expect, it } from 'vitest';
import { calculateResult, formatTime } from '../src/v2/screens/ToolsV2';

describe('ToolsV2 helpers', () => {
  it('formats timer and stopwatch values without negative output', () => {
    expect(formatTime(5 * 60 * 1000, false)).toBe('05:00');
    expect(formatTime(12_340, true)).toBe('00:12.3');
    expect(formatTime(-1, false)).toBe('00:00');
  });

  it('calculates the supported operations', () => {
    expect(calculateResult('+', 1.5, 2.25)).toBe(3.75);
    expect(calculateResult('−', 8, 3)).toBe(5);
    expect(calculateResult('×', 2.5, 4)).toBe(10);
    expect(calculateResult('÷', 9, 2)).toBe(4.5);
  });

  it('returns null for division by zero instead of a non-finite value', () => {
    expect(calculateResult('÷', 9, 0)).toBeNull();
  });
});
