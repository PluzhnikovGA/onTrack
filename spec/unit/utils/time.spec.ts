import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  MILLISECONDS_IN_SECONDS,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '../../../src/constants/number.constants';
import { TSelectOption } from '../../../src/types/baseComponents.types';
import {
  endOfHour,
  formatSeconds,
  formatSecondsWithSing,
  generatePeriodSelectOptions,
  generatePeriodSelectOptionsLabel,
  isToday,
  toSeconds,
  today,
} from '../../../src/utils/time.utils';

const mockDate = new Date(2024, 0, 1);

beforeEach(() => {
  vi.useFakeTimers().setSystemTime(mockDate);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('isToday', () => {
  it('should return true for today', () => {
    expect(isToday(mockDate)).toBe(true);
  });

  it('should return false for other date', () => {
    expect(isToday(new Date(2024, 0, 2))).toBe(false);
  });
});

describe('today', () => {
  it('should return the current date', () => {
    expect(today()).toEqual(mockDate);
  });
});

describe('formatSecondsWithSing', () => {
  const testCases = [
    { input: -SECONDS_IN_MINUTE * 0.5, expected: '-00:00:30' },
    { input: -SECONDS_IN_MINUTE, expected: '-00:01:00' },
    { input: -SECONDS_IN_HOUR, expected: '-01:00:00' },
    { input: SECONDS_IN_MINUTE * 0.5, expected: '+00:00:30' },
    { input: SECONDS_IN_MINUTE, expected: '+00:01:00' },
    { input: SECONDS_IN_HOUR, expected: '+01:00:00' },
    { input: 0, expected: '+00:00:00' },
    { input: SECONDS_IN_DAY, expected: '+00:00:00' },
    { input: -SECONDS_IN_DAY, expected: '-00:00:00' },
  ];

  it.each(testCases)('should return correct format for $input', ({ input, expected }) => {
    expect(formatSecondsWithSing(input)).toBe(expected);
  });
});

describe('formatSeconds', () => {
  const testCases = [
    { input: SECONDS_IN_HOUR * 2, expected: '02:00:00' },
    { input: -SECONDS_IN_HOUR * 0.5, expected: '00:30:00' },
    { input: 0, expected: '00:00:00' },
    { input: SECONDS_IN_DAY, expected: '00:00:00' },
  ];

  it.each(testCases)('should return $expected for $input', ({ input, expected }) => {
    expect(formatSeconds(input)).toBe(expected);
  });
});

describe('generatePeriodSelectOptions', () => {
  it('should return an array of period selection options with correct values and labels', () => {
    const expectedPeriodsInMinutes = [
      15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ];

    const options: TSelectOption<number>[] = generatePeriodSelectOptions();

    expect(options).toHaveLength(expectedPeriodsInMinutes.length);
    expectedPeriodsInMinutes.forEach((periodInMinutes) => {
      const expectedValue = periodInMinutes * SECONDS_IN_MINUTE;
      const expectedLabel = generatePeriodSelectOptionsLabel(periodInMinutes);

      const option = options.find((opt) => opt.value === expectedValue);
      expect(option).toEqual({ value: expectedValue, label: expectedLabel });
    });
  });
});

describe('endOfHour', () => {
  const expectedEndOfHour = new Date('2024-10-17T13:00:00.000Z');

  it.each([
    ['2024-10-17T12:15:00Z', expectedEndOfHour],
    ['2024-10-17T12:59:59Z', expectedEndOfHour],
    ['2024-10-17T12:00:00Z', expectedEndOfHour],
  ])('should return end of hour for date %s', (dateString, expected) => {
    const date = new Date(dateString);
    expect(endOfHour(date)).toEqual(expected);
  });
});

describe('toSeconds', () => {
  it.each([
    { input: MILLISECONDS_IN_SECONDS * 3, expected: 3 },
    { input: MILLISECONDS_IN_SECONDS * 50, expected: 50 },
    { input: MILLISECONDS_IN_SECONDS * 100, expected: 100 },
    { input: MILLISECONDS_IN_SECONDS * 0.499, expected: 0 },
    { input: MILLISECONDS_IN_SECONDS * 0.5, expected: 1 },
    { input: MILLISECONDS_IN_SECONDS * 1.25, expected: 1 },
    { input: MILLISECONDS_IN_SECONDS * 1.5, expected: 2 },
    { input: MILLISECONDS_IN_SECONDS * 1.75, expected: 2 },
    { input: 0, expected: 0 },
    { input: -MILLISECONDS_IN_SECONDS, expected: -1 },
  ])('should convert $input to seconds correctly', ({ input, expected }) => {
    expect(toSeconds(input)).toBe(expected);
  });
});

describe('generatePeriodSelectOptionsLabel', () => {
  const testCases = [
    { input: 0, expected: '00:00' },
    { input: 15, expected: '00:15' },
    { input: 30, expected: '00:30' },
    { input: 45, expected: '00:45' },
    { input: 60, expected: '01:00' },
    { input: 75, expected: '01:15' },
    { input: 120, expected: '02:00' },
    { input: 130, expected: '02:10' },
  ];

  it.each(testCases)('should return correct label for $input minutes', ({ input, expected }) => {
    expect(generatePeriodSelectOptionsLabel(input)).toBe(expected);
  });
});
