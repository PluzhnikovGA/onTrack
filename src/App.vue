<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';
import {
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
  NAV_ITEMS,
} from '@/constants/page.constants';
import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';
import { ref } from 'vue';
import { normalizePageHash } from './utils/normalizePageHash';

const currentPage = ref<string>(normalizePageHash());

function goTo(page: string): void {
  currentPage.value = page;
}
</script>

<template>
  <TheHeader @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />
  <main class="flex flex-col flex-grow">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation :current-page="currentPage" :nav-items="NAV_ITEMS" @navigate="goTo" />
</template>
