<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import RemainingActivitySeconds from '@/components/RemainingActivitySeconds.vue';

import { deleteActivity, updateActivity } from '@/utils/activity.utils';
import { generatePeriodSelectOptions } from '@/utils/time.utils';
import { resetTimelineItemActivities } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';
import { ButtonColor, IconName, type TSelectOption } from '@/types/baseComponents.types';

const props = defineProps<{
  activity: TActivity;
}>();

const periodSelectOptions: TSelectOption<number>[] = generatePeriodSelectOptions();

function handleDelete(): void {
  resetTimelineItemActivities(props.activity.id);
  deleteActivity(props.activity.id);
}

function updateSeconds(seconds: number | null): void {
  updateActivity(props.activity, { secondsToComplete: seconds ? seconds : 0 });
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :color="ButtonColor.DANGER" @click="handleDelete">
        <BaseIcon :name="IconName.TRASH" />
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
      <RemainingActivitySeconds :activity="activity" />
    </div>
  </li>
</template>
