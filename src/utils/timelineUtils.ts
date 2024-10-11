import type { TTimelineItem } from '@/types/timeline.types';

import { HOURS_IN_DAY } from '@/constants/page.constants';

export function generateTimelineItems(): TTimelineItem[] {
  return Array.from(
    { length: HOURS_IN_DAY },
    (_v, i): TTimelineItem => ({ hour: i, activityId: null, activitySeconds: 0 }),
  );
}
