<script setup lang="ts">
import { nextTick, ref, watchPostEffect } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import { currentPage } from '@/router/router';

import { scrollToTimelineHour } from '@/utils/timelineUtils';

import type { TTimelineItem } from '@/types/timeline.types';

import { PAGE_TIMELINE } from '@/constants/page.constants';

defineProps<{
  timelineItems: TTimelineItem[];
}>();

const timelineItemRefs = ref<(InstanceType<typeof TimelineItem> | null)[]>([]);

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick();
    scrollToTimelineHour(timelineItemRefs.value, null, false);
  }
});

function scrollToTimeHour(selectedHour: number) {
  scrollToTimelineHour(timelineItemRefs.value, selectedHour);
}

defineExpose({
  scrollToTimeHour,
});
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-time-hour="scrollToTimeHour"
      />
    </ul>
  </div>
</template>
