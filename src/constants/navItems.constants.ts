import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './page.constants';
import type { TNavItem } from '@/types/TNavItem.types';

export const navItems: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];
