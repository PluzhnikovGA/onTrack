import { type ComputedRef, type Ref, computed, ref } from 'vue';

import { now, today } from '@/utils/time.utils';
import { activeTimelineItem, updateTimelineItem } from '@/utils/timeline.utils';

import type { TTimelineItem } from '@/types/timeline.types';

import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECONDS,
  SECONDS_IN_DAY,
} from '@/constants/number.constants';

const timelineItemTimer: Ref<number | null> = ref(null);

export const secondsSinceMidnightInPercentage: ComputedRef<number> = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const midnight: ComputedRef<number> = computed((): number =>
  new Date(now.value).setHours(0, 0, 0, 0),
);

const secondsSinceMidnight: ComputedRef<number> = computed((): number => {
  return (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECONDS;
});

export function startCurrentDateTimer(): void {
  setInterval(() => (now.value = today()), MILLISECONDS_IN_SECONDS);
}

export function startTimelineItemTimer(timelineItem?: TTimelineItem): void {
  timelineItem = timelineItem ?? activeTimelineItem.value;

  if (!timelineItem) return;

  updateTimelineItem(timelineItem, { isActive: true });

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1,
    });
  }, MILLISECONDS_IN_SECONDS);
}

export function stopTimelineItemTimer(): void {
  if (timelineItemTimer.value !== null && activeTimelineItem.value) {
    updateTimelineItem(activeTimelineItem.value, { isActive: false });

    clearInterval(timelineItemTimer.value);

    timelineItemTimer.value = null;
  }
}

export function resetTimelineItemTimer(timelineItem: TTimelineItem): void {
  updateTimelineItem(timelineItem, { activitySeconds: 0 });

  if (timelineItem.hour === now.value.getHours()) {
    stopTimelineItemTimer();
  }
}
