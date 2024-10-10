import type { TOption } from '@/types/BaseSelector.types';
import type { TNavItem } from '@/types/NavItem.types';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';

export const HOURS_IN_DAY = 24;
export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MINUTE = 60;

export const NAV_ITEMS: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];

export const PERIOD_SELECT_OPTIONS: TOption[] = [
  { value: 5 * SECONDS_IN_MINUTE, label: '0:05' },
  { value: 10 * SECONDS_IN_MINUTE, label: '0:10' },
  { value: 15 * SECONDS_IN_MINUTE, label: '0:15' },
  { value: 20 * SECONDS_IN_MINUTE, label: '0:20' },
  { value: 25 * SECONDS_IN_MINUTE, label: '0:25' },
  { value: 30 * SECONDS_IN_MINUTE, label: '0:30' },
  { value: 35 * SECONDS_IN_MINUTE, label: '0:35' },
  { value: 40 * SECONDS_IN_MINUTE, label: '0:40' },
  { value: 45 * SECONDS_IN_MINUTE, label: '0:45' },
  { value: 50 * SECONDS_IN_MINUTE, label: '0:50' },
  { value: 55 * SECONDS_IN_MINUTE, label: '0:55' },
  { value: 60 * SECONDS_IN_MINUTE, label: '1:00' },
];
