import { createApp } from 'vue';

import { startTimelineItemTimer } from '@/utils/timeline.utils';

import { loadState, saveState } from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

loadState();

document.addEventListener('visibilitychange', (): void => {
  document.visibilityState === 'visible' ? loadState() : saveState();
});

startTimelineItemTimer();

createApp(App).mount('#app');
