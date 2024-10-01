<script setup lang="ts">
import TheLogo from './TheLogo.vue';
import TheHeaderProgress from './TheHeaderProgress.vue';
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants/page.constants';

const emit = defineEmits<{
  (e: 'goToTimeline' | 'goToProgress', page: string): void;
}>();

function handleClickLogo(): void {
  emit('goToTimeline', PAGE_TIMELINE);
}
function handleClickProgress(): void {
  emit('goToProgress', PAGE_PROGRESS);
}
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="handleClickLogo" />
    <TheHeaderProgress @click="handleClickProgress" />
  </header>
</template>
