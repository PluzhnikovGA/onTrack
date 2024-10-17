import { IconName } from '@/types/baseComponents.types';
import { PageName, type TNavItem } from '@/types/navigation.types';

export const APP_NAME = 'ontrack';

export const NAV_ITEMS: TNavItem[] = [
  { page: PageName.TIMELINE, icon: IconName.CLOCK },
  { page: PageName.ACTIVITIES, icon: IconName.LIST_BULLET },
  { page: PageName.PROGRESS, icon: IconName.CHART_BAR },
];
