import { ref } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECONDS } from '@/constants/number.constants';

import { now } from './timer.utils';

export const timelineItems = ref<TTimelineItem[]>([]);
export const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

let timelineItemTimer: number | null = null;

timelineItems.value = generateTimelineItems();

export function updateTimelineItem(timelineItem: TTimelineItem, fields: Partial<TTimelineItem>) {
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

export function startTimelineItemTimer(): void {
  const activeTimelineItem: TTimelineItem | undefined = findActiveTimelineItem();

  if (activeTimelineItem)
    timelineItemTimer = setInterval(() => {
      updateTimelineItem(activeTimelineItem, {
        activitySeconds: activeTimelineItem.activitySeconds + 1,
      });
    }, MILLISECONDS_IN_SECONDS);
}

export function stopTimelineItemTimer(): void {
  if (timelineItemTimer !== null) {
    clearInterval(timelineItemTimer);
    timelineItemTimer = null;
  }
}

export function calculateTrackedActivitySeconds(activityId: string): number {
  return filterTimelineItemsByActivityId(activityId)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
}

function generateTimelineItems(): TTimelineItem[] {
  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    hour,
    activityId: null, //[0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: 0, // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    isActive: null,
  }));
}

function filterTimelineItemsByActivityId(id: string): TTimelineItem[] {
  return timelineItems.value.filter(({ activityId }: Partial<TTimelineItem>) => activityId === id);
}

function findActiveTimelineItem(): TTimelineItem | undefined {
  return timelineItems.value.find(({ isActive }) => Boolean(isActive));
}
