import { type ComputedRef, type Ref, computed, ref, watchEffect } from 'vue';

import { today } from '@/utils/time.utils';
import { updateTimelineItem } from '@/utils/timeline.utils';

import type { TTimelineItem } from '@/types/timeline.types';

import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECONDS,
  SECONDS_IN_DAY,
} from '@/constants/number.constants';

export const now: Ref<Date> = ref(today());
export const timelineItemTimer: Ref<number | null> = ref(null);

export const secondsSinceMidnightInPercentage: ComputedRef<number> = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const midnight: ComputedRef<number> = computed((): number =>
  new Date(now.value).setHours(0, 0, 0, 0),
);

const secondsSinceMidnight: ComputedRef<number> = computed((): number => {
  return (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECONDS;
});

let currentDateTimer: number;

export function startCurrentDateTimer(): void {
  now.value = today();

  currentDateTimer = setInterval(
    () => (now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECONDS)),
    MILLISECONDS_IN_SECONDS,
  );
}

export function stopCurrentDateTimer(): void {
  clearInterval(currentDateTimer);
}

export function startTimelineItemTimer(timelineItem: TTimelineItem): void {
  console.log('startTimelineItemTimer');
  updateTimelineItem(timelineItem, { isActive: true });

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1,
    });
  }, MILLISECONDS_IN_SECONDS);
}

export function stopTimelineItemTimer(timelineItem: TTimelineItem): void {
  console.log('stopTimelineItemTimer');
  if (timelineItemTimer.value !== null) {
    updateTimelineItem(timelineItem, { isActive: false });

    clearInterval(timelineItemTimer.value);

    timelineItemTimer.value = null;
  }
}

export function resetTimelineItemTimer(timelineItem: TTimelineItem): void {
  updateTimelineItem(timelineItem, { activitySeconds: 0 });

  if (timelineItem.hour === now.value.getHours()) {
    stopTimelineItemTimer(timelineItem);
  }
}

import('@/utils/timeline.utils').then(({ activeTimelineItem }): void => {
  watchEffect((): void => {
    if (activeTimelineItem?.value && activeTimelineItem.value.hour !== now.value.getHours()) {
      stopTimelineItemTimer(activeTimelineItem.value);
    }
  });
});
