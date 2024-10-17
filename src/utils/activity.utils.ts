import { type Ref, computed, ref } from 'vue';

import type { TActivity } from '@/types/activity.types';
import type { TSelectOption } from '@/types/baseComponents.types';

import type { TState } from '@/storage/storage';

export const activities = ref<TActivity[]>([]);

export const trackedActivities = computed<TActivity[]>((): TActivity[] => {
  return activities.value.filter((activity): boolean => activity.secondsToComplete !== 0);
});

export const activitySelectOptions = computed<TSelectOption<string>[]>(
  (): TSelectOption<string>[] => generateActivitySelectOptions(activities),
);

export function createActivity(newActivity: string): void {
  activities.value.push({ id: id(), name: newActivity, secondsToComplete: 0 });
}

export function updateActivity(activity: TActivity, fields: Partial<TActivity>): TActivity {
  return Object.assign(activity, fields);
}

export function deleteActivity(activityId: string): void {
  const index = activities.value.findIndex((activity): boolean => activity.id === activityId);

  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

export function initializeActivities(state: TState): void {
  activities.value = state.activities || [];
}

export function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateActivitySelectOptions(activities: Ref<TActivity[]>): TSelectOption<string>[] {
  return activities.value.map(
    (activity): TSelectOption<string> => ({ value: activity.id, label: activity.name }),
  );
}
