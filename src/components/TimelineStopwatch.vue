<script setup lang="ts">
import { onMounted, watch, watchEffect } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { useStopwatch } from '@/composables/useStopwatch';

import { formatSeconds } from '@/utils/time.utils';
import { updateTimelineItem } from '@/utils/timeline.utils';
import { now } from '@/utils/timer.utils';

import { ButtonColor, IconNames } from '@/types/baseComponents.types';
import type { TTimelineItem } from '@/types/timeline.types';

const props = defineProps<{
  timelineItem: TTimelineItem;
}>();

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds);

onMounted(() => {
  if (props.timelineItem.isActive) {
    start();
  }
});

watchEffect(() => {
  if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
    stop();
  }
});

watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  }),
);

watch(isRunning, () => {
  updateTimelineItem(props.timelineItem, {
    isActive: Boolean(isRunning.value),
  });
});
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :color="ButtonColor.DANGER" @click="reset" :disabled="!timelineItem.activityId"
      ><BaseIcon :name="IconNames.ARROW_PATH"
    /></BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :color="ButtonColor.WARNING" @click="stop"
      ><BaseIcon :name="IconNames.PAUSE"
    /></BaseButton>
    <BaseButton
      v-else
      :color="ButtonColor.SUCCESS"
      @click="start"
      :disabled="timelineItem.hour !== now.getHours()"
      ><BaseIcon :name="IconNames.PLAY"
    /></BaseButton>
  </div>
</template>
