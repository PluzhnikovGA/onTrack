import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY, SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '@/constants/page.constants';

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
