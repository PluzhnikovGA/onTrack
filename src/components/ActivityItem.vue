<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline';

import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import type { TActivity } from '@/types/activity.types';
import { ButtonColor } from '@/types/base-components.types.ts';
import type { TTimelineItem } from '@/types/timeline.types';

import { PERIOD_SELECT_OPTIONS } from '@/constants/page.constants';

const props = defineProps<{
  activity: TActivity;
  timelineItems: TTimelineItem[];
}>();

const emit = defineEmits<{
  (e: 'delete', id: string): void;
  (e: 'setSecondsToCompleted', value: number | null): void;
}>();

function handleDelete(): void {
  emit('delete', props.activity.id);
}

function setSecondsToCompleted(value: string | number | null): void {
  if (value === null) {
    emit('setSecondsToCompleted', null);
  } else if (isNaN(Number(value))) {
    throw new Error('Invalid value received');
  } else {
    emit('setSecondsToCompleted', Number(value));
  }
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :color="ButtonColor.DANGER" @click="handleDelete">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        :placeholder="'hh:mm'"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="!!activity.secondsToComplete ? activity.secondsToComplete : null"
        @select="setSecondsToCompleted($event)"
      />
      <ActivitySecondsToComplete :activity="activity" :timelineItems="timelineItems" />
    </div>
  </li>
</template>
