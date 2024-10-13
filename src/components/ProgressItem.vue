<script setup lang="ts">
import { computed } from 'vue';

import { getActivityProgress, getProgressColorClass } from '@/utils/progress.utils';
import { formatSeconds } from '@/utils/time.utils';
import { getTotalActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

const props = defineProps<{
  activity: TActivity;
}>();

const progress = computed((): number => {
  return getActivityProgress(props.activity);
});
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="`${getProgressColorClass(progress)}`" :style="`width: ${progress}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span
      ><span
        >{{ formatSeconds(getTotalActivitySeconds(activity.id)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
