import { ref } from 'vue';

import type { TTimelineComponent } from '@/types/timeline.types';

import { NAV_ITEMS, PAGE_TIMELINE } from '@/constants/page.constants';

function normalizePageHash(): string {
  const hash = window.location.hash.slice(1);

  if (NAV_ITEMS.some((item) => item.page === hash)) return hash;

  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
}

export const timelineRef = ref<TTimelineComponent>();

export const currentPage = ref<string>(normalizePageHash());

export function navigate(page: string): void {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE && timelineRef.value) {
    timelineRef.value.scrollToTimeHour();
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({ behavior: 'instant' });
  }

  currentPage.value = page;
}
