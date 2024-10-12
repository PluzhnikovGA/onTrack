<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';
import { inject, ref } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

import { currentHour, formatSeconds } from '@/utils/time.utils';

import { ButtonColor } from '@/types/base-components.types.ts';
import type { TTimelineItem, TUpdateTimelineItemActivitySeconds } from '@/types/timeline.types';

import { MILLISECONDS_IN_SECONDS } from '@/constants/time.constants';

import { updateTimelineItemActivitySecondsKey } from '../keys';

const props = defineProps<{
  timelineItem: TTimelineItem;
}>();

const updateTimelineItemActivitySeconds = inject<TUpdateTimelineItemActivitySeconds>(
  updateTimelineItemActivitySecondsKey,
)!;

const seconds = ref<number>(props.timelineItem.activitySeconds);
const isRunning = ref<number | null>(null);

const isStartButtonDisabled = props.timelineItem.hour !== currentHour();

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(1, props.timelineItem);
    seconds.value++;
  }, MILLISECONDS_IN_SECONDS);
}

function stop() {
  if (typeof isRunning.value === 'number') clearInterval(isRunning.value);
  isRunning.value = null;
}

function reset() {
  stop();
  updateTimelineItemActivitySeconds(-seconds.value, props.timelineItem);
  seconds.value = 0;
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :color="ButtonColor.DANGER" @click="reset" :disabled="!timelineItem.activityId"
      ><ArrowPathIcon class="h-8"
    /></BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :color="ButtonColor.WARNING" @click="stop"
      ><PauseIcon class="h-8"
    /></BaseButton>
    <BaseButton v-else :color="ButtonColor.SUCCESS" @click="start" :disabled="isStartButtonDisabled"
      ><PlayIcon class="h-8"
    /></BaseButton>
  </div>
</template>
