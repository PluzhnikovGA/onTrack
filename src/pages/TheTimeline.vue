<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import type { TOption } from '@/types/BaseSelector.types';
import type { TTimelineItem } from '@/types/TimelineItem.types';

defineProps<{
  timelineItems: TTimelineItem[];
  activitySelectOptions: TOption[];
}>();
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="`hour_${timelineItem.hour}`"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>
