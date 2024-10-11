import type { TOption } from '@/types/base-components.types.ts';

import {
  MILLISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/page.constants';

export function formatSeconds(seconds: number): string {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECONDS);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

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
