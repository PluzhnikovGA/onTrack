<script setup lang="ts">
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { deleteActivity, updateActivity } from '@/utils/activity.utils';
import { generatePeriodSelectOptions } from '@/utils/time.utils';
import { resetTimelineItemActivities } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';
import { ButtonColor, IconNames } from '@/types/base-components.types.ts';

const props = defineProps<{
  activity: TActivity;
}>();

const periodSelectOptions = generatePeriodSelectOptions();

function handleDelete(): void {
  resetTimelineItemActivities(props.activity.id);
  deleteActivity(props.activity.id);
}

function updateSeconds(seconds: string | number | null): void {
  const parsedSeconds = Number(seconds);

  updateActivity(props.activity, { secondsToComplete: isNaN(parsedSeconds) ? 0 : parsedSeconds });
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :color="ButtonColor.DANGER" @click="handleDelete">
        <BaseIcon :name="IconNames.TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        :placeholder="'hh:mm'"
        :options="periodSelectOptions"
        :selected="!!activity.secondsToComplete ? activity.secondsToComplete : null"
        @select="updateSeconds"
      />
      <ActivitySecondsToComplete :activity="activity" />
    </div>
  </li>
</template>
