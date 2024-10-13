import { getTotalActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants/number.constants';

export function getProgressColorClass(percentage: number): string {
  console.log(percentage);
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

export function getActivityProgress(activity: TActivity): number {
  const activitySeconds = getTotalActivitySeconds(activity.id);
  return Math.floor((activitySeconds * HUNDRED_PERCENT) / activity.secondsToComplete);
}
