<script setup lang="ts">
import { nextTick, ref, watchPostEffect } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { scrollToTimelineHour } from '@/utils/timelineUtils';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

import { PAGE_TIMELINE } from '@/constants/page.constants';

const props = defineProps<{
  timelineItems: TTimelineItem[];
  activitySelectOptions: TOption[];
  activities: TActivity[];
  currentPage: string;
}>();

const emit = defineEmits<{
  (e: 'setTimelineItemActivity', activity: TActivity | null, timelineItem: TTimelineItem): void;
}>();

const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();
    const currentHour = new Date().getHours();
    scrollToTimelineHour(currentHour, timelineItemRefs.value, false);
  }
});

function setTimelineItemActivity(activity: TActivity | null, timelineItem: TTimelineItem): void {
  emit('setTimelineItemActivity', activity, timelineItem);
}

function scrollToTimeHour(selectedHour: number) {
  scrollToTimelineHour(selectedHour, timelineItemRefs.value);
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        ref="timelineItemRefs"
        @select-activity="setTimelineItemActivity($event, timelineItem)"
        @scroll-to-time-hour="scrollToTimeHour"
      />
    </ul>
  </div>
</template>
