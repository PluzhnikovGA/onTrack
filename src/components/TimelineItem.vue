<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import TimelineStopwatch from '@/components/TimelineStopwatch.vue';

import { activitySelectOptions } from '@/utils/activity.utils';
import { updateTimelineItem } from '@/utils/timeline.utils';

import type { TTimelineItem } from '@/types/timeline.types';

defineProps<{
  timelineItem: TTimelineItem;
}>();
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :placeholder="`Rest`"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />

    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
