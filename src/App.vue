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
import { computed, ref } from 'vue';
import { normalizePageHash } from '@/utils/normalizePageHash';
import { generateTimelineItems } from '@/utils/generateTimelineItems';
import type { TTimelineItem } from '@/types/TimelineItem.types';
import { generateActivitySelectOptions } from '@/utils/generateActivitySelectOptions';
import type { TOption } from '@/types/BaseSelector.types';
import { generateActivitiesList, id } from '@/utils/generateActivitiesList';
import type { TActivity } from './types/Activities.types';

const currentPage = ref<string>(normalizePageHash());
const timelineItems = ref<TTimelineItem[]>(generateTimelineItems());

const activities = ref<TActivity[]>(generateActivitiesList());

const activitySelectOptions = computed((): TOption[] =>
  generateActivitySelectOptions(activities.value),
);

function goTo(page: string): void {
  currentPage.value = page;
}

function deleteActivity(activityId: string): void {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activityId) {
      timelineItem.activityId = null;
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

function setTimelineItemActivity(activity: TActivity | null, timelineItem: TTimelineItem): void {
  console.log();
  timelineItem.activityId = !!activity ? activity.id : null;
}

function setSecondsToCompleted(seconds: number | null, activity: TActivity): void {
  activity.secondsToComplete = !!seconds ? seconds : 0;
}
</script>

<template>
  <TheHeader @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-seconds-to-completed="setSecondsToCompleted"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNavigation :current-page="currentPage" :nav-items="NAV_ITEMS" @navigate="goTo" />
</template>
