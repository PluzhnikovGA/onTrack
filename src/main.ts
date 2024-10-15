import { createApp } from 'vue';

import { activities } from '@/utils/activity.utils';
import { timelineItems } from '@/utils/timeline.utils';

import * as storage from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

loadState();

document.addEventListener('visibilitychange', (): void => {
  document.visibilityState === 'visible' ? loadState() : saveState();
});

function saveState(): void {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value,
  });
}

function loadState(): void {
  const state = storage.load();

  timelineItems.value = state.timelineItems;
  activities.value = state.activities;
}

createApp(App).mount('#app');
