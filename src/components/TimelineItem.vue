<script setup lang="ts">
import { type ComputedRef, inject } from 'vue';

import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import TimelineStopwatch from '@/components/TimelineStopwatch.vue';

import type { TOption } from '@/types/base-components.types.ts';
import type { TSetTimelineItemActivity, TTimelineItem } from '@/types/timeline.types';

import { activitySelectOptionsKey, setTimelineItemActivityKey } from '../keys';

defineProps<{
  timelineItem: TTimelineItem;
}>();

const activitySelectOptions = inject<ComputedRef<TOption[]>>(activitySelectOptionsKey)!;
const setTimelineItemActivity = inject<TSetTimelineItemActivity>(setTimelineItemActivityKey)!;

const emit = defineEmits<{
  (e: 'scrollToTimeHour'): void;
}>();

function scrollToTimeHour() {
  emit('scrollToTimeHour');
}
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="scrollToTimeHour" />
    <BaseSelect
      :placeholder="`Rest`"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="setTimelineItemActivity($event, timelineItem)"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
