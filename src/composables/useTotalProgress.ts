import { type ComputedRef, computed } from 'vue';

import { trackedActivities } from '@/utils/activity.utils';
import { calculateCompletionPercentage, getProgressColorClass } from '@/utils/progress.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

type TUseProgress = {
  percentage: ComputedRef<number>;
  colorClass: ComputedRef<string>;
};

export function useTotalProgress(): TUseProgress {
  const percentage = computed<number>((): number =>
    calculateCompletionPercentage(totalTrackedSeconds.value),
  );

  const totalTrackedSeconds = computed<number>((): number => {
    return trackedActivities.value
      .map((activity): number => Math.min(calculateTrackedActivitySeconds(activity.id)))
      .reduce((total: number, seconds: number): number => {
        return total + seconds;
      }, 0);
  });

  const colorClass = computed<string>((): string => getProgressColorClass(percentage.value));

  return {
    percentage,
    colorClass,
  };
}
