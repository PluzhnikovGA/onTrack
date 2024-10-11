import { NAV_ITEMS, PAGE_TIMELINE } from '@/constants/page.constants';

export function normalizePageHash(): string {
  const hash = window.location.hash.slice(1);

  if (NAV_ITEMS.some((item) => item.page === hash)) return hash;

  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
}
