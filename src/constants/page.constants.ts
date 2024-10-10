import type { TOption } from '@/types/BaseSelector.types';
import type { TNavItem } from '@/types/NavItem.types';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';

export const HOURS_IN_DAY = 24;
export const SECONDS_IN_HOUR = 3600;

export const NAV_ITEMS: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];

export const PERIOD_SELECT_OPTIONS: TOption[] = [
  { value: 1 * SECONDS_IN_HOUR, label: '01:00' },
  { value: 2 * SECONDS_IN_HOUR, label: '02:00' },
  { value: 3 * SECONDS_IN_HOUR, label: '03:00' },
];
