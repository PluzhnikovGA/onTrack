import { type Ref, ref } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { currentHour } from '@/utils/time.utils';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time.constants';

export const timelineItems = ref<TTimelineItem[]>([]);
export const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

import('@/utils/activity.utils').then(({ activities }: { activities: Ref<TActivity[]> }): void => {
  timelineItems.value = generateTimelineItems(activities.value);
});

export function updateTimelineItem(timelineItem: TTimelineItem, fields: Partial<TTimelineItem>) {
  return Object.assign(timelineItem, fields);
}

export function resetTimelineItemActivities(activityId: string): void {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activityId))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: 0,
      }),
    );
}

export function scrollToHour(hour: number, isSmooth: boolean = true): void {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1]?.$el;

  el?.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
}

export function scrollToCurrentHour(isSmooth: boolean = false): void {
  scrollToHour(currentHour(), isSmooth);
}

export function getTotalActivitySeconds(activityId: string): number {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activityId))
    .reduce((totalSum, timelineItem) => Math.round(totalSum + timelineItem.activitySeconds), 0);
}

function generateTimelineItems(activities: TActivity[]): TTimelineItem[] {
  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
  }));
}

function hasActivity(timeline: TTimelineItem, activityId: string): boolean {
  return timeline.activityId === activityId;
}
