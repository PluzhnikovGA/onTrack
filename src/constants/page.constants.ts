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
