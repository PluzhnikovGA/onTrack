<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import type { TTimelineItem } from '@/types/TimelineItem.types';

defineProps<{
  timelineItems: TTimelineItem[];
}>();
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
