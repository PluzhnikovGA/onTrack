import { type Ref, computed, ref } from 'vue';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';

import { SECONDS_IN_HOUR } from '@/constants/time.constants';

export const activities = ref<TActivity[]>(generateActivitiesList());

export const activitySelectOptions = computed((): TOption[] =>
  generateActivitySelectOptions(activities),
);

export function createActivity(newActivity: string): void {
  activities.value.push({ id: id(), name: newActivity, secondsToComplete: 0 });
}

export function setActivitySecondsToCompleted(
  seconds: string | number | null,
  activity: TActivity,
): void {
  activity.secondsToComplete = typeof seconds === 'number' ? seconds : 0;
}

export function deleteActivity(activityId: string): void {
  const index = activities.value.findIndex((activity) => activity.id === activityId);

  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function generateActivitiesList(): TActivity[] {
  return [
    { id: id(), name: 'Coding', secondsToComplete: 0 * SECONDS_IN_HOUR },
    { id: id(), name: 'Training', secondsToComplete: 1 * SECONDS_IN_HOUR },
    { id: id(), name: 'Reading', secondsToComplete: 2 * SECONDS_IN_HOUR },
  ];
}

function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateActivitySelectOptions(activities: Ref<TActivity[]>): TOption[] {
  return activities.value.map((activity) => ({ value: activity.id, label: activity.name }));
}
