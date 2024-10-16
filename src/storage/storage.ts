import { activities } from '@/utils/activity.utils';
import { endOfHour, isToday, toSeconds, today } from '@/utils/time.utils';
import { activeTimelineItem, timelineItems } from '@/utils/timeline.utils';
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/utils/timer.utils';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { APP_NAME } from '@/constants/page.constants';

type TData = {
  timelineItems: TTimelineItem[];
  activities: TActivity[];
  lastActiveAt: Date;
};

export function syncState(shouldLoad: boolean = true): void {
  shouldLoad ? loadState() : saveState();

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value);
  }
}

function saveState(): void {
  console.log('saveState');
  const state: TData = {
    timelineItems: timelineItems.value,
    activities: activities.value,
    lastActiveAt: today(),
  };

  localStorage.setItem(APP_NAME, JSON.stringify(state));
}

function loadState(): void {
  console.log('loadState');
  const serializedState = localStorage.getItem(APP_NAME);

  const state: TData = serializedState ? JSON.parse(serializedState) : {};

  const lastActiveAt = new Date(state.lastActiveAt);

  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value;
  activities.value = state.activities || activities.value;
}

function syncIdleSeconds(timelineItems: TTimelineItem[], lastActiveAt: Date): TTimelineItem[] {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive);

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt);
  }

  return timelineItems;
}

function calculateIdleSeconds(lastActiveAt: Date) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().getTime() - lastActiveAt.getTime())
    : toSeconds(endOfHour(lastActiveAt).getTime() - lastActiveAt.getTime());
}
