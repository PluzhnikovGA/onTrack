<script setup lang="ts">
import { type ComputedRef, inject } from 'vue';

import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import TimelineStopwatch from '@/components/TimelineStopwatch.vue';

import type { TOption } from '@/types/base-components.types.ts';
import type { TSetTimelineItemActivity, TTimelineItem } from '@/types/timeline.types';

const props = defineProps<{
  timelineItem: TTimelineItem;
}>();

const activitySelectOptions = inject<ComputedRef<TOption[]>>('activitySelectOptions');
const setTimelineItemActivity = inject<TSetTimelineItemActivity>('setTimelineItemActivity')!;

const emit = defineEmits<{
  (e: 'scrollToTimeHour', selectedHour: number): void;
}>();

function scrollToTimeHour() {
  emit('scrollToTimeHour', props.timelineItem.hour);
}
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="scrollToTimeHour" />
    <BaseSelect
      :placeholder="`Rest`"
      :options="activitySelectOptions!"
      :selected="timelineItem.activityId"
      @select="setTimelineItemActivity($event, timelineItem)"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
