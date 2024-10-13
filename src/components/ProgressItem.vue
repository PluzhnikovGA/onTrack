<script setup lang="ts">
import { type ComputedRef, computed } from 'vue';

import {
  calculateActivityCompletionPercentage,
  getProgressColorClass,
} from '@/utils/progress.utils';
import { formatSeconds } from '@/utils/time.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

const props = defineProps<{
  activity: TActivity;
}>();

const percentage = computed((): number => {
  return calculateActivityCompletionPercentage(
    props.activity.secondsToComplete,
    trackedActivitySeconds.value,
  );
});

const trackedActivitySeconds: ComputedRef<number> = computed(() =>
  calculateTrackedActivitySeconds(props.activity.id),
);
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="`${getProgressColorClass(percentage)}`" :style="`width: ${percentage}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span
      ><span
        >{{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
