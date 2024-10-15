import { createApp } from 'vue';

import { loadState, saveState } from '@/storage/storage';

import App from './App.vue';
import './assets/main.css';

loadState();

document.addEventListener('visibilitychange', (): void => {
  document.visibilityState === 'visible' ? loadState() : saveState();
});

createApp(App).mount('#app');
