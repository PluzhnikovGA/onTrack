import { type ComputedRef, computed } from 'vue';

import {
  calculateActivityCompletionPercentage,
  getProgressColorClass,
} from '@/utils/progress.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

type TUseProgress = {
  percentage: ComputedRef<number>;
  trackedSeconds: ComputedRef<number>;
  colorClass: ComputedRef<string>;
};

export function useProgress(activity: TActivity): TUseProgress {
  const trackedSeconds: ComputedRef<number> = computed((): number =>
    calculateTrackedActivitySeconds(activity.id),
  );

  const percentage: ComputedRef<number> = computed((): number =>
    calculateActivityCompletionPercentage(activity.secondsToComplete, trackedSeconds.value),
  );

  const colorClass: ComputedRef<string> = computed((): string =>
    getProgressColorClass(percentage.value),
  );

  return {
    percentage,
    trackedSeconds,
    colorClass,
  };
}
