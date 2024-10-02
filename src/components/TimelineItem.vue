<script setup lang="ts">
import { ref } from 'vue';
import type { TTimelineItem } from '@/types/TimelineItem.types';
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import type { TOption } from '@/types/BaseSelector.types';

defineProps<{
  timelineItem: TTimelineItem;
}>();

const options: TOption[] = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
];

const selectedActivityId = ref<number | null>(null);
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="options"
      :placeholder="`Rest`"
      @select="selectedActivityId = $event"
    />
  </li>
</template>
