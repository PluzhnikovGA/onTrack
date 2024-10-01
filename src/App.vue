<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheNavigation from './components/TheNavigation.vue';
import { navItems } from './constants/navItems.constants';
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constants/page.constants';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeline from './pages/TheTimeline.vue';
import { ref } from 'vue';

const currentPage = ref<string>(normalizePageHash());

function normalizePageHash(): string {
  const hash = window.location.hash.slice(1);

  if (navItems.some((item) => item.page === hash)) return hash;

  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
}

function handleNavClick(page: string): void {
  currentPage.value = page;
}
</script>

<template>
  <TheHeader />
  <main class="flex flex-col flex-grow">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation :currentPage="currentPage" :navItems="navItems" @navigate="handleNavClick" />
</template>
