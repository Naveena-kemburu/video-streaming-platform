import { describe, it, expect } from 'vitest';
import { formatTime, formatDuration } from '../formatTime';

describe('formatTime', () => {
  it('formats seconds correctly', () => {
    expect(formatTime(45)).toBe('0:45');
  });

  it('formats minutes and seconds', () => {
    expect(formatTime(125)).toBe('2:05');
  });

  it('formats hours, minutes, and seconds', () => {
    expect(formatTime(3665)).toBe('1:01:05');
  });
});

describe('formatDuration', () => {
  it('formats duration in minutes', () => {
    expect(formatDuration(125)).toBe('2m');
  });

  it('formats duration with hours', () => {
    expect(formatDuration(3665)).toBe('1h 1m');
  });
});
