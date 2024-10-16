<script setup lang="ts">
import { onActivated, onDeactivated } from 'vue';

import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue';
import TimelineItem from '@/components/TimelineItem.vue';

import {
  scrollToCurrentHour,
  stopTimelineItemTimer,
  timelineItemRefs,
  timelineItems,
} from '@/utils/timeline.utils';
import { startTimer, stopTimer } from '@/utils/timer.utils';

onActivated(() => {
  scrollToCurrentHour();
  startTimer();
});

onDeactivated(stopTimer);

stopTimelineItemTimer();
</script>

<template>
  <div class="mt-7 relative">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>
