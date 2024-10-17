import { describe, expect, it } from 'vitest';

import {
  calculateActivityCompletionPercentage,
  getProgressColorClass,
} from '@/utils/progress.utils';

import { ProgressColorClass } from '@/types/progress.types';

import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants/number.constants';

describe('getProgressColorClass', () => {
  it('should return red color', () => {
    expect(getProgressColorClass(0)).toBe(ProgressColorClass.BG_RED);
    expect(getProgressColorClass(LOW_PERCENT - 1)).toBe(ProgressColorClass.BG_RED);
  });

  it('should return yellow color', () => {
    expect(getProgressColorClass(LOW_PERCENT)).toBe(ProgressColorClass.BG_YELLOW);
    expect(getProgressColorClass(MEDIUM_PERCENT - 1)).toBe(ProgressColorClass.BG_YELLOW);
  });

  it('should return blue color', () => {
    expect(getProgressColorClass(MEDIUM_PERCENT)).toBe(ProgressColorClass.BG_BLUE);
    expect(getProgressColorClass(HUNDRED_PERCENT - 1)).toBe(ProgressColorClass.BG_BLUE);
  });

  it('should return green color', () => {
    expect(getProgressColorClass(HUNDRED_PERCENT)).toBe(ProgressColorClass.BG_GREEN);
  });
});

describe('calculateActivityCompletionPercentage', () => {
  it('should return corrected calculated percentage', () => {
    const secondsToComplete: number = 200;
    const trackedSeconds: number = 100;

    const result: number = calculateActivityCompletionPercentage(secondsToComplete, trackedSeconds);

    expect(result).toBe(50);
  });

  it("should return 0, if it don't have values", () => {
    const secondsToComplete: number = 200;
    const trackedSeconds: number = 0;

    const result: number = calculateActivityCompletionPercentage(secondsToComplete, trackedSeconds);

    expect(result).toBe(0);
  });

  it('should return 100, if all activities completed', () => {
    const secondsToComplete: number = 200;
    const trackedSeconds: number = 200;

    const result: number = calculateActivityCompletionPercentage(secondsToComplete, trackedSeconds);

    expect(result).toBe(100);
  });
});

it.todo('calculateCompletionPercentage');

it.todo('totalActivityToComplete');
