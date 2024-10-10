<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import type { TActivity } from '@/types/Activities.types';
import type { TOption } from '@/types/BaseSelector.types';
import type { TTimelineItem } from '@/types/TimelineItem.types';

defineProps<{
  timelineItems: TTimelineItem[];
  activitySelectOptions: TOption[];
  activities: TActivity[];
}>();

const emit = defineEmits<{
  (e: 'setTimelineItemActivity', activity: TActivity, timelineItem: TTimelineItem): void;
}>();

function setTimelineItemActivity(activity: TActivity, timelineItem: TTimelineItem): void {
  emit('setTimelineItemActivity', activity, timelineItem);
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
        @select-activity="setTimelineItemActivity($event, timelineItem)"
      />
    </ul>
  </div>
</template>
