<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { currentHour, formatSeconds } from '@/utils/time.utils';
import { updateTimelineItem } from '@/utils/timeline.utils';

import { ButtonColor, IconNames } from '@/types/base-components.types';
import type { TTimelineItem } from '@/types/timeline.types';

import { MILLISECONDS_IN_SECONDS } from '@/constants/number.constants';

const props = defineProps<{
  timelineItem: TTimelineItem;
}>();

const seconds = ref<number>(props.timelineItem.activitySeconds);
const isRunning = ref<number | null>(null);
const temp = 120;

const isStartButtonDisabled = props.timelineItem.hour !== currentHour();

watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value });
  },
);

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + temp,
    });
    seconds.value += temp;
  }, MILLISECONDS_IN_SECONDS);
}

function stop() {
  if (typeof isRunning.value === 'number') clearInterval(isRunning.value);
  isRunning.value = null;
}

function reset() {
  stop();
  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value,
  });
  seconds.value = 0;
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :color="ButtonColor.DANGER" @click="reset" :disabled="!timelineItem.activityId"
      ><BaseIcon :name="IconNames.ARROW_PATH"
    /></BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :color="ButtonColor.WARNING" @click="stop"
      ><BaseIcon :name="IconNames.PAUSE"
    /></BaseButton>
    <BaseButton v-else :color="ButtonColor.SUCCESS" @click="start" :disabled="isStartButtonDisabled"
      ><BaseIcon :name="IconNames.PLAY"
    /></BaseButton>
  </div>
</template>
