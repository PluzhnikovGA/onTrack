import { type Ref, computed, ref } from 'vue';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types';

import { SECONDS_IN_MINUTE } from '@/constants/number.constants';

export const activities = ref<TActivity[]>(generateActivitiesList());

export const trackedActivities = computed(() => {
  return activities.value.filter((activity) => activity.secondsToComplete);
});

export const activitySelectOptions = computed((): TOption[] =>
  generateActivitySelectOptions(activities),
);

export function createActivity(newActivity: string): void {
  activities.value.push({ id: id(), name: newActivity, secondsToComplete: 0 });
}

export function updateActivity(activity: TActivity, fields: Partial<TActivity>) {
  return Object.assign(activity, fields);
}

export function deleteActivity(activityId: string): void {
  const index = activities.value.findIndex((activity) => activity.id === activityId);

  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function generateActivitiesList(): TActivity[] {
  return [
    { id: id(), name: 'Coding', secondsToComplete: 15 * SECONDS_IN_MINUTE },
    { id: id(), name: 'Training', secondsToComplete: 15 * SECONDS_IN_MINUTE },
    { id: id(), name: 'Reading', secondsToComplete: 15 * SECONDS_IN_MINUTE },
  ];
}

function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateActivitySelectOptions(activities: Ref<TActivity[]>): TOption[] {
  return activities.value.map((activity) => ({ value: activity.id, label: activity.name }));
}
