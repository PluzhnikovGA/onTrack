<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline';

import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { deleteActivity, setActivitySecondsToCompleted } from '@/utils/activity.utils';
import { generatePeriodSelectOptions } from '@/utils/time.utils';
import { resetTimelineItemActivities } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';
import { ButtonColor } from '@/types/base-components.types.ts';

const props = defineProps<{
  activity: TActivity;
}>();

const periodSelectOptions = generatePeriodSelectOptions();

function handleDelete(): void {
  resetTimelineItemActivities(props.activity.id);
  deleteActivity(props.activity.id);
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
        :options="periodSelectOptions"
        :selected="!!activity.secondsToComplete ? activity.secondsToComplete : null"
        @select="setActivitySecondsToCompleted($event, activity.id)"
      />
      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>
