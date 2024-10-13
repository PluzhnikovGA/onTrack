<script setup lang="ts">
import { useProgress } from '@/composables/useProgress';

import { formatSeconds } from '@/utils/time.utils';

import type { TActivity } from '@/types/activity.types';

import { HUNDRED_PERCENT } from '@/constants/number.constants';

const props = defineProps<{
  activity: TActivity;
}>();

const { percentage, trackedActivitySeconds, colorClass } = useProgress(props.activity);
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
      />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ Math.min(percentage, HUNDRED_PERCENT) }}%</span
      ><span
        >{{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
