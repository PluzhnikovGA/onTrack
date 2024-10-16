<script setup>
import { onActivated } from 'vue';

import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue';
import TimelineItem from '@/components/TimelineItem.vue';

import { scrollToCurrentHour, timelineItemRefs, timelineItems } from '@/utils/timeline.utils';

onActivated(scrollToCurrentHour);
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
