import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { APP_NAME } from '@/constants/page.constants';

type TData = {
  timelineItems: TTimelineItem[];
  activities: TActivity[];
};

export function load(): TData {
  const state = localStorage.getItem(APP_NAME);

  return state ? JSON.parse(state) : {};
}

export function save(data: TData): void {
  localStorage.setItem(APP_NAME, JSON.stringify({ ...data, date: new Date().toDateString() }));
}
