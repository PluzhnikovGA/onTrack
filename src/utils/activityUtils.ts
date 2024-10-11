import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

import { SECONDS_IN_HOUR } from '@/constants/page.constants';

export function generateActivitiesList(): TActivity[] {
  return [
    { id: id(), name: 'Coding', secondsToComplete: 0 * SECONDS_IN_HOUR },
    { id: id(), name: 'Training', secondsToComplete: 1 * SECONDS_IN_HOUR },
    { id: id(), name: 'Reading', secondsToComplete: 2 * SECONDS_IN_HOUR },
  ];
}

export function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function generateActivitySelectOptions(activities: TActivity[]): TOption[] {
  return activities.map((activity) => ({ value: activity.id, label: activity.name }));
}

export function getTotalActivitySeconds(
  activityId: string,
  timelineItems: TTimelineItem[],
): number {
  return timelineItems
    .filter((item) => item.activityId === activityId)
    .reduce((totalSum, item) => Math.round(totalSum + item.activitySeconds), 0);
}
