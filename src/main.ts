import { createApp } from 'vue';

import { activeTimelineItem } from '@/utils/timeline.utils';
import { startTimelineItemTimer } from '@/utils/timer.utils';

import { loadState, saveState } from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

loadState();

if (activeTimelineItem.value) startTimelineItemTimer(activeTimelineItem.value);

document.addEventListener('visibilitychange', (): void => {
  document.visibilityState === 'visible' ? loadState() : saveState();
});

createApp(App).mount('#app');
