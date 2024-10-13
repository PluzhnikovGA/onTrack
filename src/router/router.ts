import { type Component, ref } from 'vue';

import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';

import {
  NAV_ITEMS,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
} from '@/constants/page.constants';

type TRoutes = Record<string, Component>;

export const currentPage = ref<string>(normalizePageHash());

export const routes: TRoutes = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress,
};

export function navigate(page: string): void {
  document.body.scrollIntoView({ behavior: 'instant' });

  currentPage.value = page;
}

function normalizePageHash(): string {
  const hash = window.location.hash.slice(1);

  if (NAV_ITEMS.some((item) => item.page === hash)) return hash;

  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
}
