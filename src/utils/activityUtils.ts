import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';

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
