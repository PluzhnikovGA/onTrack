<script setup lang="ts">
import { provide, readonly } from 'vue';

import TheActivities from '@/pages/TheActivities.vue';
import TheProgress from '@/pages/TheProgress.vue';
import TheTimeline from '@/pages/TheTimeline.vue';

import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';

import { currentPage, timelineRef } from '@/router/router';

import {
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToCompleted,
} from '@/utils/activity.utils';
import { generatePeriodSelectOptions } from '@/utils/time.utils';
import {
  resetTimelineItemActivities,
  setTimelineItemActivity,
  updateTimelineItemActivitySeconds,
} from '@/utils/timeline.utils';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants/page.constants';

import * as keys from './keys';

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompletedKey, setActivitySecondsToCompleted);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, (activityId: string) => {
  resetTimelineItemActivities(activityId);
  deleteActivity(activityId);
});
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));
</script>

<template>
  <TheHeader />
  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation />
</template>
