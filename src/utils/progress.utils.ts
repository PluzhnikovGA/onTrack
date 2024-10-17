import { computed } from 'vue';

import type { TActivity } from '@/types/activity.types';
import { ProgressColorClass } from '@/types/progress.types';

import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants/number.constants';

import { trackedActivities } from './activity.utils';

export function getProgressColorClass(percentage: number): ProgressColorClass {
  switch (true) {
    case percentage < LOW_PERCENT:
      return ProgressColorClass.BG_RED_500;
    case percentage < MEDIUM_PERCENT:
      return ProgressColorClass.BG_YELLOW_500;
    case percentage < HUNDRED_PERCENT:
      return ProgressColorClass.BG_BLUE_500;
    default:
      return ProgressColorClass.BG_GREEN_500;
  }
}

export function calculateActivityCompletionPercentage(
  secondsToComplete: number,
  trackedSeconds: number,
): number {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete);
}

export function calculateCompletionPercentage(totalTrackedSeconds: number): number {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivityToComplete.value);
}

const totalActivityToComplete = computed<number>((): number => {
  return trackedActivities.value
    .map(({ secondsToComplete }: Pick<TActivity, 'secondsToComplete'>): number => secondsToComplete)
    .reduce((total: number, seconds: number): number => total + seconds, 0);
});
