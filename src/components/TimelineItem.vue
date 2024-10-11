<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import TimelineStopwatch from '@/components/TimelineStopwatch.vue';

import type { TActivity } from '@/types/activity.types';
import type { TOption } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

const props = defineProps<{
  timelineItem: TTimelineItem;
  activitySelectOptions: TOption[];
  activities: TActivity[];
}>();

const emit = defineEmits<{
  (e: 'selectActivity', activity: TActivity | null): void;
}>();

function selectActivity(id: string | number | null): void {
  if (id === null || (typeof id === 'string' && isNaN(Number(id)))) {
    const activity = props.activities.find((activity) => activity.id === id);
    emit('selectActivity', activity || null);
  } else {
    throw new Error('Invalid value received');
  }
}
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :placeholder="`Rest`"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="selectActivity($event)"
    />
    <TimelineStopwatch :seconds="timelineItem.activitySeconds" />
  </li>
</template>
