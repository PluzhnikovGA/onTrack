<script setup lang="ts">
import { computed, provide, ref } from 'vue';

import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';

import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';

import { generateActivitiesList, generateActivitySelectOptions, id } from '@/utils/activityUtils';
import { normalizePageHash } from '@/utils/navUtils';
import { generateTimelineItems } from '@/utils/timelineUtils';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

import {
  NAV_ITEMS,
  PAGE_ACTIVITIES,
  PAGE_PROGRESS,
  PAGE_TIMELINE,
} from '@/constants/page.constants';

import { generatePeriodSelectOptions } from './utils/timeUtils';

const currentPage = ref<string>(normalizePageHash());
const activities = ref<TActivity[]>(generateActivitiesList());
const timelineItems = ref<TTimelineItem[]>(generateTimelineItems(activities.value));
const timeline = ref();

const activitySelectOptions = computed((): TOption[] => generateActivitySelectOptions(activities));

function goTo(page: string): void {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToTimeHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView({ behavior: 'instant' });
  }
  currentPage.value = page;
}

function deleteActivity(activityId: string): void {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activityId) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  const index = activities.value.findIndex((activity) => activity.id === activityId);

  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function createActivity(newActivity: string): void {
  activities.value.push({ id: id(), name: newActivity, secondsToComplete: 0 });
}

function setTimelineItemActivity(activityId: string | null, timelineItem: TTimelineItem): void {
  timelineItem.activityId = activityId;
}

function setSecondsToCompleted(seconds: number | null, activity: TActivity): void {
  activity.secondsToComplete = !!seconds ? seconds : 0;
}

function updateTimelineItemActivitySeconds(second: number, timelineItem: TTimelineItem) {
  timelineItem.activitySeconds += second;
}

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds);
provide('timelineItems', timelineItems.value);
provide('periodSelectOptions', generatePeriodSelectOptions());
provide('setTimelineItemActivity', setTimelineItemActivity);
provide('setSecondsToCompleted', setSecondsToCompleted);
provide('createActivity', createActivity);
provide('activitySelectOptions', activitySelectOptions);
provide('deleteActivity', deleteActivity);
</script>

<template>
  <TheHeader @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :current-page="currentPage"
      ref="timeline"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation :current-page="currentPage" :nav-items="NAV_ITEMS" @navigate="goTo" />
</template>
