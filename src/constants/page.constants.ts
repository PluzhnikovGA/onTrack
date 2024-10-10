import type { TOption } from '@/types/BaseSelector.types';
import type { TNavItem } from '@/types/NavItem.types';
import { generatePeriodSelectOptions } from '@/utils/generatePeriodSelectOptions';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';

export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;

export const NAV_ITEMS: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];

const PERIOD_IN_MINUTES: number[] = [
  15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
];

export const PERIOD_SELECT_OPTIONS: TOption[] = generatePeriodSelectOptions(PERIOD_IN_MINUTES);
