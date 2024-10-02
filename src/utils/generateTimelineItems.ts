import { HOURS_IN_DAY } from '@/constants/page.constants';

export function generateTimelineItems() {
  return Array.from({ length: HOURS_IN_DAY }, (_v, i): number => i);
}
