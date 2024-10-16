import { type ComputedRef, type Ref, computed, ref } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { endOfHour, isToday, toSeconds, today } from '@/utils/time.utils';

import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/number.constants';

import type { TData } from '@/storage/storage';

export const timelineItems: Ref<TTimelineItem[]> = ref<TTimelineItem[]>([]);
export const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

export const activeTimelineItem: ComputedRef<TTimelineItem | undefined> = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive),
);

export function updateTimelineItem(
  timelineItem: TTimelineItem,
  fields: Partial<TTimelineItem>,
): TTimelineItem {
  return Object.assign(timelineItem, fields);
}

export function resetTimelineItemActivities(activityId: string): void {
  filterTimelineItemsByActivityId(activityId).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
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
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
}

export function initializeTimelineItems(state: TData): void {
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

function filterTimelineItemsByActivityId(id: string): TTimelineItem[] {
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

function calculateIdleSeconds(lastActiveAt: Date) {
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
