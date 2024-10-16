import { activities } from '@/utils/activity.utils';
import { isToday, today } from '@/utils/time.utils';
import { timelineItems } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { MILLISECONDS_IN_SECONDS, SECONDS_IN_HOUR } from '@/constants/number.constants';
import { APP_NAME } from '@/constants/page.constants';

type TData = {
  timelineItems: TTimelineItem[];
  activities: TActivity[];
  lastActiveAt: Date;
};

export function saveState(): void {
  const state: TData = {
    timelineItems: timelineItems.value,
    activities: activities.value,
    lastActiveAt: today(),
  };

  localStorage.setItem(APP_NAME, JSON.stringify(state));
}

export function loadState(): void {
  const serializedState = localStorage.getItem(APP_NAME);

  const state: TData = serializedState ? JSON.parse(serializedState) : {};

  const lastActiveAt = new Date(state.lastActiveAt);

  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value;
  activities.value = state.activities || activities.value;
}

function syncIdleSeconds(timelineItems: TTimelineItem[], lastActiveAt: Date): TTimelineItem[] {
  const activeTimelineItem = timelineItems.find(({ isActive }) => Boolean(isActive));

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt);
  }

  return timelineItems;
}

function calculateIdleSeconds(lastActiveAt: Date) {
  let idleMilliseconds = today().getTime() - lastActiveAt.getTime();

  if (lastActiveAt.getHours() !== today().getHours()) {
    idleMilliseconds = getEndOfIdleHour(lastActiveAt).getTime() - lastActiveAt.getTime();
  }

  return Math.round(idleMilliseconds / MILLISECONDS_IN_SECONDS);
}

function getEndOfIdleHour(lastActiveAt: Date): Date {
  const endOfIdleHour = new Date(lastActiveAt);

  endOfIdleHour.setTime(endOfIdleHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS);

  endOfIdleHour.setMinutes(0, 0, 0);

  return endOfIdleHour;
}
