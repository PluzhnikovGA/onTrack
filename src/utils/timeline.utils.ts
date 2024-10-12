import { type Ref, ref } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { currentHour } from '@/utils/time.utils';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/time.constants';

export const timelineItems = ref<TTimelineItem[]>([]);

import('@/utils/activity.utils').then(({ activities }: { activities: Ref<TActivity[]> }): void => {
  timelineItems.value = generateTimelineItems(activities.value);
});

export function updateTimelineItemActivitySeconds(
  second: number,
  timelineItem: TTimelineItem,
): void {
  timelineItem.activitySeconds += second;
}

export function setTimelineItemActivity(
  activityId: string | null,
  timelineItem: TTimelineItem,
): void {
  timelineItem.activityId = activityId;
}

export function resetTimelineItemActivities(activityId: string): void {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activityId) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });
}

export function scrollToTimelineHour(
  timelineItemRefs: (InstanceType<typeof TimelineItem> | null)[],
  hour: number | null = null,
  isSmooth: boolean = true,
): void {
  hour ??= currentHour();

  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs[hour - 1]?.$el;

  el?.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' });
}

export function getTotalActivitySeconds(activityId: string): number {
  return timelineItems.value
    .filter((item) => item.activityId === activityId)
    .reduce((totalSum, item) => Math.round(totalSum + item.activitySeconds), 0);
}

function generateTimelineItems(activities: TActivity[]): TTimelineItem[] {
  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
  }));
}
