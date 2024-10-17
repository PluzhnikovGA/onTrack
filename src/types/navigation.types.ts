import type { IconName } from './baseComponents.types.js';

export enum PageName {
  TIMELINE = 'timeline',
  ACTIVITIES = 'activities',
  PROGRESS = 'progress',
}

export type TNavItem = {
  page: PageName;
  icon: IconName;
};
