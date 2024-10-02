<script setup lang="ts">
import type { TTimelineItem } from '@/types/TimelineItem.types';
import BaseSelect from '@/components/BaseSelect.vue';
import type { TOption } from '@/types/BaseSelector.types';

const props = defineProps<{
  timelineItem: TTimelineItem;
}>();

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
];

const options: TOption[] = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
];

const selectedActivityId: number = 2;
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <a href="#" :class="hourLinkClasses"> {{ timelineItem.hour }}:00 </a>
    <BaseSelect :selected="selectedActivityId" :options="options" :placeholder="`Rest`" />
  </li>
</template>
