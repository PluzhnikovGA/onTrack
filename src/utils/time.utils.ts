import type { TOption } from '@/types/baseComponents.types';

import {
  MILLISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/number.constants';

export function isToday(date: Date): boolean {
  return today().toDateString() === date.toDateString();
}

export function today(): Date {
  const date = new Date();

  return date;
}

export function tomorrow(): Date {
  const tomorrow = today();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
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

export function generatePeriodSelectOptions(): TOption[] {
  const periodsInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
  ];

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
