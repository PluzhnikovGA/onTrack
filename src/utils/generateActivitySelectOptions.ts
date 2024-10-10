import type { TOption } from '@/types/BaseSelector.types';

export function generateActivitySelectOptions(activities: string[]): TOption[] {
  return activities.map((label, value) => ({ value, label }));
}
