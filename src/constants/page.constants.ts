import { ChartBarIcon, ClockIcon, ListBulletIcon } from '@heroicons/vue/24/outline';

import type { TNavItem } from '@/types/navigation.types';

export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';

export const NAV_ITEMS: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];

export const MIDNIGHT_HOUR = 0;
export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_SECONDS = 1000;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
