<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { ButtonColor } from '@/types/BaseButton.types';
import type { TActivity } from '@/types/Activities.types';
import { PERIOD_SELECT_OPTIONS } from '@/constants/page.constants';

const props = defineProps<{
  activity: TActivity;
}>();

const emit = defineEmits<{
  (e: 'delete', id: string): void;
}>();

function handleDelete(): void {
  emit('delete', props.activity.id);
}

const secondsToComplete = ref<number | null>(null);

function updateSecondsToComplete(event: string | number | null): number | null {
  switch (true) {
    case event === null:
      return null;
    case isNaN(Number(event)):
      throw new Error('Invalid value received');
    default:
      return Number(event);
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
    <div>
      <BaseSelect
        class="font-mono"
        :placeholder="'h:mm'"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="secondsToComplete"
        @select="secondsToComplete = updateSecondsToComplete($event)"
      />
    </div>
  </li>
</template>
