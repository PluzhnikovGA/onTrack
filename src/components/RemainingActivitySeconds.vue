<script setup lang="ts">
import { computed } from 'vue';

import { formatSecondsWithSing } from '@/utils/time.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

const props = defineProps<{
  activity: TActivity;
}>();

const remainingSeconds = computed<number>(
  (): number =>
    calculateTrackedActivitySeconds(props.activity.id) - props.activity.secondsToComplete,
);

const classes = computed<string[]>((): string[] => [
  `flex items-center rounded px-2 font-mono text-xl`,
  remainingSeconds.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
]);
</script>

<template>
  <div v-if="activity.secondsToComplete" :class="classes">
    {{ formatSecondsWithSing(remainingSeconds) }}
  </div>
</template>
