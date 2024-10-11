<script setup lang="ts">
import { computed, provide, ref } from 'vue';

import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';

import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';

import { currentPage, timelineRef } from '@/router/router';

import { generateActivitiesList, generateActivitySelectOptions, id } from '@/utils/activityUtils';
import { generatePeriodSelectOptions } from '@/utils/timeUtils';
import { generateTimelineItems } from '@/utils/timelineUtils';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants/page.constants';

const activities = ref<TActivity[]>(generateActivitiesList());
const timelineItems = ref<TTimelineItem[]>(generateTimelineItems(activities.value));

const activitySelectOptions = computed((): TOption[] => generateActivitySelectOptions(activities));

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
  <TheHeader />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation />
</template>
