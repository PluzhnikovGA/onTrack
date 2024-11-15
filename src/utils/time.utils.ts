import { ref } from 'vue';

import type { TSelectOption } from '@/types/baseComponents.types';

import {
  MILLISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  PERIOD_IN_MINUTES,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/number.constants';

export const now = ref<Date>(today());

export function isToday(date: Date): boolean {
  return today().toDateString() === date.toDateString();
}

export function today(): Date {
  return new Date();
}

export function formatSecondsWithSing(seconds: number): string {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`;
}

export function formatSeconds(seconds: number): string {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECONDS);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function generatePeriodSelectOptions(): TSelectOption<number>[] {
  return PERIOD_IN_MINUTES.map(
    (periodInMinutes): TSelectOption<number> => ({
      value: periodInMinutes * SECONDS_IN_MINUTE,
      label: generatePeriodSelectOptionsLabel(periodInMinutes),
    }),
  );
}

export function endOfHour(date: Date): Date {
  const endOfHour = new Date(date);

  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECONDS);

  endOfHour.setMinutes(0, 0, 0);

  return endOfHour;
}

export function toSeconds(milliseconds: number): number {
  return Math.round(milliseconds / MILLISECONDS_IN_SECONDS);
}

export function generatePeriodSelectOptionsLabel(periodInMinute: number): string {
  const minutes = (periodInMinute % MINUTES_IN_HOUR).toString().padStart(2, '0');
  const hours = Math.floor(periodInMinute / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
}
