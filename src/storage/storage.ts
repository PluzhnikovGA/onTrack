import { activities } from '@/utils/activity.utils';
import { isToday, today } from '@/utils/time.utils';
import { timelineItems } from '@/utils/timeline.utils';

import { APP_NAME } from '@/constants/page.constants';

export function saveState(): void {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      date: today(),
    }),
  );
}

export function loadState(): void {
  const serializedState = localStorage.getItem(APP_NAME);

  const state = serializedState ? JSON.parse(serializedState) : {};

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value;
  activities.value = state.activities || activities.value;
}
