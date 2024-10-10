import type { TActivity } from '@/types/Activities.types';
import type { TOption } from '@/types/BaseSelector.types';

export function generateActivitySelectOptions(activities: TActivity[]): TOption[] {
  return activities.map((activity) => ({ value: activity.id, label: activity.name }));
}
