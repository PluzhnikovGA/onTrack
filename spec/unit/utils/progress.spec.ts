import { describe, expect, it } from 'vitest';

import {
  HUNDRED_PERCENT,
  LOW_PERCENT,
  MEDIUM_PERCENT,
  SECONDS_IN_HOUR,
} from '../../../src/constants/number.constants';
import { TActivity } from '../../../src/types/activity.types';
import { ProgressColorClass } from '../../../src/types/progress.types';
import { activities } from '../../../src/utils/activity.utils';
import {
  calculateActivityCompletionPercentage,
  calculateCompletionPercentage,
  getProgressColorClass,
  totalActivityToComplete,
} from '../../../src/utils/progress.utils';

function createActivityData(id: string, name: string, secondsToComplete: number): TActivity {
  return {
    id,
    name,
    secondsToComplete,
  };
}

const TRAINING_ACTIVITY_ID = '4rhjfhd7';
const READING_ACTIVITY_ID = 'cvkfjdh54d';

describe('getProgressColorClass', () => {
  const testCases = [
    { percent: 0, color: ProgressColorClass.BG_RED },
    { percent: LOW_PERCENT - 1, color: ProgressColorClass.BG_RED },
    { percent: LOW_PERCENT, color: ProgressColorClass.BG_YELLOW },
    { percent: MEDIUM_PERCENT - 1, color: ProgressColorClass.BG_YELLOW },
    { percent: MEDIUM_PERCENT, color: ProgressColorClass.BG_BLUE },
    { percent: HUNDRED_PERCENT - 1, color: ProgressColorClass.BG_BLUE },
    { percent: HUNDRED_PERCENT, color: ProgressColorClass.BG_GREEN },
  ];

  it.each(testCases)('should return $color for $percent', ({ percent, color }) => {
    expect(getProgressColorClass(percent)).toBe(color);
  });
});

describe('calculateActivityCompletionPercentage', () => {
  const secondsToComplete: number = 200;
  const testCases = [
    { trackedSeconds: 0, percent: 0 },
    { trackedSeconds: 100, percent: 50 },
    { trackedSeconds: 200, percent: 100 },
  ];

  it.each(testCases)(
    'should return $percent percents for $trackedSeconds trackedSeconds',
    ({ trackedSeconds, percent }) => {
      expect(calculateActivityCompletionPercentage(secondsToComplete, trackedSeconds)).toBe(
        percent,
      );
    },
  );
});

describe('calculateCompletionPercentage', () => {
  const testCases = [
    { totalTrackedSeconds: 0, percent: 0 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 1, percent: 16 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 2, percent: 33 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 3, percent: 50 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 4, percent: 66 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 5, percent: 83 },
    { totalTrackedSeconds: SECONDS_IN_HOUR * 6, percent: 100 },
  ];

  activities.value = [
    createActivityData(TRAINING_ACTIVITY_ID, 'Training', SECONDS_IN_HOUR * 2),
    createActivityData(READING_ACTIVITY_ID, 'Reading', SECONDS_IN_HOUR * 4),
  ];

  it.each(testCases)(
    'should return $percent completion percentage for $totalTrackedSeconds total tracked seconds',
    ({ totalTrackedSeconds, percent }) => {
      expect(calculateCompletionPercentage(totalTrackedSeconds)).toBe(percent);
    },
  );
});

describe('totalActivityToComplete', () => {
  it('should return the correct total seconds of all seconds to complete all activities', () => {
    activities.value = [
      createActivityData(TRAINING_ACTIVITY_ID, 'Training', SECONDS_IN_HOUR * 2),
      createActivityData(READING_ACTIVITY_ID, 'Reading', SECONDS_IN_HOUR * 4),
    ];

    expect(totalActivityToComplete.value).toBe(21600);
  });
});
