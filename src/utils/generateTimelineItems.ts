import { HOURS_IN_DAY } from '@/constants/page.constants';
import type { TTimelineItem } from '@/types/TimelineItem.types';

export function generateTimelineItems(): TTimelineItem[] {
  return Array.from(
    { length: HOURS_IN_DAY },
    (_v, i): TTimelineItem => ({ hour: i, activityId: null }),
  );
}
