import { describe, expect, it, vi } from 'vitest';

import {
  endOfHour,
  formatSeconds,
  formatSecondsWithSing,
  generatePeriodSelectOptionsLabel,
  isToday,
  toSeconds,
  today,
} from '@/utils/time.utils';

describe('isToday', () => {
  it('should return true', () => {
    const mockDate = new Date(2024, 0, 1);
    vi.useFakeTimers().setSystemTime(mockDate);

    expect(isToday(mockDate)).toEqual(true);

    vi.useRealTimers();
  });

  it('should return false', () => {
    const mockDate = new Date(2024, 0, 1);
    vi.useFakeTimers().setSystemTime(mockDate);

    expect(isToday(new Date(2024, 0, 2))).toEqual(false);

    vi.useRealTimers();
  });
});

describe('today', () => {
  it('should return the current date', () => {
    const mockDate = new Date(2024, 0, 1);
    vi.useFakeTimers().setSystemTime(mockDate);

    expect(today()).toEqual(mockDate);

    vi.useRealTimers();
  });
});

describe('formatSecondsWithSing', () => {
  it('should return time with -', () => {
    expect(formatSecondsWithSing(-30)).toBe('-00:00:30');
    expect(formatSecondsWithSing(-60)).toBe('-00:01:00');
    expect(formatSecondsWithSing(-3600)).toBe('-01:00:00');
  });

  it('should return time with +', () => {
    expect(formatSecondsWithSing(30)).toBe('+00:00:30');
    expect(formatSecondsWithSing(60)).toBe('+00:01:00');
    expect(formatSecondsWithSing(3600)).toBe('+01:00:00');
  });

  it('should return 0 with sing', () => {
    expect(formatSecondsWithSing(0)).toBe('+00:00:00');
    expect(formatSecondsWithSing(60 * 60 * 24)).toBe('+00:00:00');
    expect(formatSecondsWithSing(-60 * 60 * 24)).toBe('-00:00:00');
  });
});

describe('formatSeconds', () => {
  it('should return time in format xx:xx:xx', () => {
    expect(formatSeconds(7200)).toBe('02:00:00');
    expect(formatSeconds(-1800)).toBe('00:30:00');
    expect(formatSeconds(0)).toBe('00:00:00');
    expect(formatSeconds(60 * 60 * 24)).toBe('00:00:00');
  });
});

it.todo('generatePeriodSelectOptions');

describe('endOfHour', () => {
  it('should return the end of the hour for a given date', () => {
    const date = new Date('2024-10-17T12:15:00Z');
    const expectedEndOfHour = new Date('2024-10-17T13:00:00.000Z');

    expect(endOfHour(date)).toEqual(expectedEndOfHour);
  });

  it('should handle edge case for end of hour', () => {
    const date = new Date('2024-10-17T12:59:59Z');
    const expectedEndOfHour = new Date('2024-10-17T13:00:00.000Z');

    expect(endOfHour(date)).toEqual(expectedEndOfHour);
  });

  it('should work correctly for times at the beginning of an hour', () => {
    const date = new Date('2024-10-17T12:00:00Z');
    const expectedEndOfHour = new Date('2024-10-17T13:00:00.000Z');

    expect(endOfHour(date)).toEqual(expectedEndOfHour);
  });
});

describe('toSeconds', () => {
  it('should convert milliseconds to seconds correctly', () => {
    expect(toSeconds(3000)).toBe(3);
    expect(toSeconds(50000)).toBe(50);
    expect(toSeconds(100000)).toBe(100);
  });

  it('should round correctly for values between seconds', () => {
    expect(toSeconds(499)).toBe(0);
    expect(toSeconds(500)).toBe(1);
    expect(toSeconds(1250)).toBe(1);
    expect(toSeconds(1500)).toBe(2);
    expect(toSeconds(1750)).toBe(2);
  });

  it('should handle zero and negative values', () => {
    expect(toSeconds(0)).toBe(0);
    expect(toSeconds(-1000)).toBe(-1);
  });
});

describe('generatePeriodSelectOptionsLabel', () => {
  it('should return correctly formatted label for 0 minutes', () => {
    expect(generatePeriodSelectOptionsLabel(0)).toBe('00:00');
  });

  it('should return correctly formatted label for less than an hour', () => {
    expect(generatePeriodSelectOptionsLabel(15)).toBe('00:15');
    expect(generatePeriodSelectOptionsLabel(30)).toBe('00:30');
    expect(generatePeriodSelectOptionsLabel(45)).toBe('00:45');
  });

  it('should return correctly formatted label for one hour', () => {
    expect(generatePeriodSelectOptionsLabel(60)).toBe('01:00');
  });

  it('should return correctly formatted label for more than one hour', () => {
    expect(generatePeriodSelectOptionsLabel(75)).toBe('01:15');
    expect(generatePeriodSelectOptionsLabel(120)).toBe('02:00');
    expect(generatePeriodSelectOptionsLabel(130)).toBe('02:10');
  });
});
