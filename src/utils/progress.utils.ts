import { computed } from 'vue';

import { trackedActivities } from '@/utils/activity.utils';

import type { TActivity } from '@/types/activity.types';
import { ProgressColorClass } from '@/types/progress.types';

import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants/number.constants';

export function getProgressColorClass(percentage: number): ProgressColorClass {
  switch (true) {
    case percentage < LOW_PERCENT:
      return ProgressColorClass.BG_RED;
    case percentage < MEDIUM_PERCENT:
      return ProgressColorClass.BG_YELLOW;
    case percentage < HUNDRED_PERCENT:
      return ProgressColorClass.BG_BLUE;
    default:
      return ProgressColorClass.BG_GREEN;
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

export const totalActivityToComplete = computed<number>((): number => {
  return trackedActivities.value
    .map(({ secondsToComplete }: Pick<TActivity, 'secondsToComplete'>): number => secondsToComplete)
    .reduce((total: number, seconds: number): number => total + seconds, 0);
});
