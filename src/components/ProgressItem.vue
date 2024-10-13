<script setup lang="ts">
import { useProgress } from '@/composables/useProgress';

import { formatSeconds } from '@/utils/time.utils';

import type { TActivity } from '@/types/activity.types';

const props = defineProps<{
  activity: TActivity;
}>();

const { percentage, trackedSeconds, colorClass } = useProgress(props.activity);
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="`${colorClass}`" :style="`width: ${percentage}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span
      ><span
        >{{ formatSeconds(trackedSeconds) }} / {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
