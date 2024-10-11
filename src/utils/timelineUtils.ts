import TimelineItem from '@/components/TimelineItem.vue';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import {
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/page.constants';

export function generateTimelineItems(activities: TActivity[]): TTimelineItem[] {
  return Array.from(
    { length: HOURS_IN_DAY },
    (_v, i): TTimelineItem => ({
      hour: i,
      activityId: i % 4 === 0 ? null : activities[i % 2].id,
      activitySeconds: i % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * i) % SECONDS_IN_HOUR,
    }),
  );
}

export function scrollToTimelineHour(
  timelineItemRefs: (InstanceType<typeof TimelineItem> | null)[],
  hour: number | null = null,
  isSmooth: boolean = true,
) {
  hour ??= new Date().getHours();
  const options = { behavior: isSmooth ? 'smooth' : 'instant' };
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView();
  } else {
    timelineItemRefs[hour - 1]?.$el?.scrollIntoView(options);
  }
}
