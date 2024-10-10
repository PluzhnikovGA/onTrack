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
import { normalizePageHash } from '@/utils/normalizePageHash';
import { generateTimelineItems } from '@/utils/generateTimelineItems';
import type { TTimelineItem } from '@/types/TimelineItem.types';
import { generateActivitySelectOptions } from '@/utils/generateActivitySelectOptions';
import type { TOption } from './types/BaseSelector.types';

const currentPage = ref<string>(normalizePageHash());
const timelineItems: TTimelineItem[] = generateTimelineItems();

const activities = ref<string[]>(['Coding', 'Reading', 'Training']);

const activitySelectOptions: TOption[] = generateActivitySelectOptions(activities.value);

function goTo(page: string): void {
  currentPage.value = page;
}

function deleteActivity(activity: string): void {
  activities.value.splice(activities.value.indexOf(activity), 1);
}
</script>

<template>
  <TheHeader @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation :current-page="currentPage" :nav-items="NAV_ITEMS" @navigate="goTo" />
</template>
