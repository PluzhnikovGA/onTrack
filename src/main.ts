import { createApp } from 'vue';

import { syncState } from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

syncState();

document.addEventListener('visibilitychange', (): void => {
  syncState(document.visibilityState === 'visible');
});

createApp(App).mount('#app');
