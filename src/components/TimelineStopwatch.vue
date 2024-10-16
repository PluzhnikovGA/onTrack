<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { formatSeconds } from '@/utils/time.utils';
import {
  now,
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  timelineItemTimer,
} from '@/utils/timer.utils';

import { ButtonColor, IconNames } from '@/types/baseComponents.types';
import type { TTimelineItem } from '@/types/timeline.types';

defineProps<{
  timelineItem: TTimelineItem;
}>();
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :color="ButtonColor.DANGER"
      @click="($event) => resetTimelineItemTimer(timelineItem)"
      :disabled="!timelineItem.activityId"
      ><BaseIcon :name="IconNames.ARROW_PATH"
    /></BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItemTimer && timelineItem.hour === now.getHours()"
      :color="ButtonColor.WARNING"
      @click="($event) => stopTimelineItemTimer(timelineItem)"
      ><BaseIcon :name="IconNames.PAUSE"
    /></BaseButton>
    <BaseButton
      v-else
      :color="ButtonColor.SUCCESS"
      @click="($event) => startTimelineItemTimer(timelineItem)"
      :disabled="timelineItem.hour !== now.getHours()"
      ><BaseIcon :name="IconNames.PLAY"
    /></BaseButton>
  </div>
</template>
