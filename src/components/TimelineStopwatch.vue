<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { formatSeconds, now } from '@/utils/time.utils';
import { activeTimelineItem } from '@/utils/timeline.utils';
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer,
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
      v-if="timelineItem === activeTimelineItem"
      :color="ButtonColor.WARNING"
      @click="stopTimelineItemTimer"
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
