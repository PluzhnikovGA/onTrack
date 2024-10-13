import { type ComputedRef, computed } from 'vue';

import type { TActivity } from '@/types/activity.types';

import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants/number.constants';

import { trackedActivities } from './activity.utils';

export function getProgressColorClass(percentage: number): string {
  switch (true) {
    case percentage < LOW_PERCENT:
      return 'bg-red-500';
    case percentage < MEDIUM_PERCENT:
      return 'bg-yellow-500';
    case percentage < HUNDRED_PERCENT:
      return 'bg-blue-500';
    default:
      return 'bg-green-500';
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

const totalActivityToComplete: ComputedRef<number> = computed((): number => {
  return trackedActivities.value
    .map(({ secondsToComplete }: Pick<TActivity, 'secondsToComplete'>): number => secondsToComplete)
    .reduce((total: number, seconds: number): number => total + seconds, 0);
});
