import TimelineItem from '@/components/TimelineItem.vue';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants/page.constants';

export function generateTimelineItems(activities: TActivity[]): TTimelineItem[] {
  return Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
  }));
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
