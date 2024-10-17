import { activities, initializeActivities } from '@/utils/activity.utils';
import { today } from '@/utils/time.utils';
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/utils/timeline.utils';
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/utils/timer.utils';

import type { TActivity } from '@/types/activity.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { APP_NAME } from '@/constants/page.constants';

export type TState = {
  timelineItems: TTimelineItem[];
  activities: TActivity[];
  lastActiveAt: Date;
};

export function syncState(shouldLoad: boolean = true): void {
  shouldLoad ? loadState() : saveState();

  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer();
  }
}

function saveState(): void {
  const state: TState = {
    timelineItems: timelineItems.value,
    activities: activities.value,
    lastActiveAt: today(),
  };

  localStorage.setItem(APP_NAME, JSON.stringify(state));
}

function loadState(): void {
  const state: TState = loadFromLocalStorage();

  initializeActivities(state);

  initializeTimelineItems(state);
}

function loadFromLocalStorage(): TState {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}');
}
