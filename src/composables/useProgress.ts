import { type ComputedRef, computed } from 'vue';

import {
  calculateActivityCompletionPercentage,
  getProgressColorClass,
} from '@/utils/progress.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

type TUseProgress = {
  percentage: ComputedRef<number>;
  trackedActivitySeconds: ComputedRef<number>;
  colorClass: ComputedRef<string>;
};

export function useProgress(activity: TActivity): TUseProgress {
  const trackedActivitySeconds = computed<number>((): number =>
    calculateTrackedActivitySeconds(activity.id),
  );

  const percentage = computed<number>((): number =>
    calculateActivityCompletionPercentage(activity.secondsToComplete, trackedActivitySeconds.value),
  );

  const colorClass = computed<string>((): string => getProgressColorClass(percentage.value));

  return {
    percentage,
    trackedActivitySeconds,
    colorClass,
  };
}
