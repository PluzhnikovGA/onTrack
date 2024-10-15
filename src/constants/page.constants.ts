import { IconNames } from '@/types/baseComponents.types';
import type { TNavItem } from '@/types/navigation.types';

export const APP_NAME = 'ontrack';

export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';

export const NAV_ITEMS: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: IconNames.CLOCK },
  { page: PAGE_ACTIVITIES, icon: IconNames.LIST_BULLET },
  { page: PAGE_PROGRESS, icon: IconNames.CHART_BAR },
];
