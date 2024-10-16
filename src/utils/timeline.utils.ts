import { type ComputedRef, type Ref, computed, ref } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/number.constants';

import { now } from './timer.utils';

export const timelineItems: Ref<TTimelineItem[]> = ref<TTimelineItem[]>([]);
export const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

timelineItems.value = generateTimelineItems();

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
      activitySeconds:
        timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
    }),
  );
}

export function scrollToHour(hour: number, isSmooth: boolean = true): void {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1]?.$el;

  el?.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
}

export function scrollToCurrentHour(isSmooth: boolean = false): void {
  scrollToHour(now.value.getHours(), isSmooth);
}

export function calculateTrackedActivitySeconds(activityId: string): number {
  return filterTimelineItemsByActivityId(activityId)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
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
