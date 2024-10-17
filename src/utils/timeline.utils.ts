import { computed, ref, watch } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { endOfHour, isToday, now, toSeconds, today } from '@/utils/time.utils';
import { stopTimelineItemTimer } from '@/utils/timer.utils';

import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/number.constants';

import type { TState } from '@/storage/storage';

export const timelineItems = ref<TTimelineItem[]>([]);
export const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

export const activeTimelineItem = computed<TTimelineItem | undefined>(
  (): TTimelineItem | undefined => timelineItems.value.find(({ isActive }) => isActive),
);

watch(now, (after, before): void => {
  if (activeTimelineItem?.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer();
  }

  if (after.getHours() !== before.getHours() && after.getHours() === MIDNIGHT_HOUR) {
    resetTimelineItems();
  }
});

export function updateTimelineItem(
  timelineItem: TTimelineItem,
  fields: Partial<TTimelineItem>,
): TTimelineItem {
  return Object.assign(timelineItem, fields);
}

export function resetTimelineItemActivities(activityId: string): void {
  filterTimelineItemsByActivityId(activityId).forEach(
    (timelineItem): TTimelineItem =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds:
          timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
      }),
  );
}

export function scrollToHour(hour: number, isSmooth: boolean = true): void {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1]?.$el;

  el?.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
}

export function scrollToCurrentHour(isSmooth: boolean = false): void {
  scrollToHour(today().getHours(), isSmooth);
}

export function calculateTrackedActivitySeconds(activityId: string): number {
  return filterTimelineItemsByActivityId(activityId)
    .map(({ activitySeconds }): number => activitySeconds)
    .reduce((total, seconds): number => Math.round(total + seconds), 0);
}

export function initializeTimelineItems(state: TState): void {
  const lastActiveAt = new Date(state.lastActiveAt);

  timelineItems.value = state.timelineItems || generateTimelineItems();

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt);
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems();
  }
}

function generateTimelineItems(): TTimelineItem[] {
  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }));
}

export function filterTimelineItemsByActivityId(id: string): TTimelineItem[] {
  return timelineItems.value.filter(({ activityId }: Partial<TTimelineItem>) => activityId === id);
}

function syncIdleSeconds(lastActiveAt: Date): void {
  if (activeTimelineItem.value) {
    updateTimelineItem(activeTimelineItem.value, {
      activitySeconds:
        activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt),
    });
  }
}

function calculateIdleSeconds(lastActiveAt: Date): number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt).getTime() - lastActiveAt.getTime());
}

function resetTimelineItems(): void {
  timelineItems.value.forEach(
    (timelineItem): TTimelineItem =>
      updateTimelineItem(timelineItem, {
        activitySeconds: 0,
        isActive: false,
      }),
  );
}
