import { type Component, ref } from 'vue';

import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';

import { PageName } from '@/types/navigation.types';

import { NAV_ITEMS } from '@/constants/page.constants';

export const currentPage = ref<PageName>(normalizePageHash());

export const routes: Record<PageName, Component> = {
  [PageName.TIMELINE]: TheTimeline,
  [PageName.ACTIVITIES]: TheActivities,
  [PageName.PROGRESS]: TheProgress,
};

export function navigate(page: PageName): void {
  document.body.scrollIntoView({ behavior: 'instant' });

  currentPage.value = page;
}

export function normalizePageHash(): PageName {
  const hash = window.location.hash.slice(1);

  if (NAV_ITEMS.some((item): boolean => item.page === hash)) return hash as PageName;

  window.location.hash = PageName.TIMELINE;
  return PageName.TIMELINE;
}
