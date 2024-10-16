import { createApp } from 'vue';

import { startCurrentDateTimer } from '@/utils/timer.utils';

import { syncState } from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

syncState();
startCurrentDateTimer();

document.addEventListener('visibilitychange', (): void => {
  syncState(document.visibilityState === 'visible');
});

createApp(App).mount('#app');
