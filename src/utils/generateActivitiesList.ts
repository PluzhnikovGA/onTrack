import { SECONDS_IN_HOUR } from '@/constants/page.constants';
import type { TActivity } from '@/types/Activities.types';

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
