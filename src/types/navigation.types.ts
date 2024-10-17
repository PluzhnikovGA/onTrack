import type { IconName } from './baseComponents.types.js';

export enum PageName {
  PAGE_TIMELINE = 'timeline',
  PAGE_ACTIVITIES = 'activities',
  PAGE_PROGRESS = 'progress',
}

export type TNavItem = {
  page: PageName;
  icon: IconName;
};
