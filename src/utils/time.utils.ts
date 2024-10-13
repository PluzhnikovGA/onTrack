import type { TOption } from '@/types/base-components.types';

import {
  MILLISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/number.constants';

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

export function currentHour(): number {
  return new Date().getHours();
}
