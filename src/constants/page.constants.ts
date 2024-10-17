import { IconName } from '@/types/baseComponents.types';
import { PageName, type TNavItem } from '@/types/navigation.types';

export const APP_NAME = 'ontrack';

export const NAV_ITEMS: TNavItem[] = [
  { page: PageName.PAGE_TIMELINE, icon: IconName.CLOCK },
  { page: PageName.PAGE_ACTIVITIES, icon: IconName.LIST_BULLET },
  { page: PageName.PAGE_PROGRESS, icon: IconName.CHART_BAR },
];
