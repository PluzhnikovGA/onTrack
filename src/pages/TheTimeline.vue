<script setup lang="ts">
import { onActivated } from 'vue';

import TimelineItem from '@/components/TimelineItem.vue';

import {
  scrollToCurrentHour,
  scrollToHour,
  timelineItemRefs,
  timelineItems,
} from '@/utils/timeline.utils';

onActivated(scrollToCurrentHour);
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-time-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
