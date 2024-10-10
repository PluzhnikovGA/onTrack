import { MINUTES_IN_HOUR, SECONDS_IN_MINUTE } from '@/constants/page.constants';
import type { TOption } from '@/types/BaseSelector.types';

export function generatePeriodSelectOptions(periodsInMinutes: number[]): TOption[] {
  return periodsInMinutes.map((periodInMinutes) => ({
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinutes),
  }));
}

function generatePeriodSelectOptionsLabel(periodInMinute: number): string {
  const minutes = (periodInMinute % MINUTES_IN_HOUR).toString().padStart(2, '0');
  const hours = Math.floor(periodInMinute / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
}
