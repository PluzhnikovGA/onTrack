<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

import { formatSeconds } from '@/utils/timeUtils';

import { ButtonColor } from '@/types/base-components.types.ts';

import { MILLISECONDS_IN_SECONDS } from '@/constants/page.constants';

const props = defineProps<{
  seconds: number;
  hour: number;
}>();

const emit = defineEmits<{
  (e: 'updateSeconds', value: number): void;
}>();

const seconds = ref<number>(props.seconds);
const isRunning = ref<number | null>(null);

const isStartButtonDisabled = props.hour !== new Date().getHours();

function start() {
  isRunning.value = setInterval(() => {
    emit('updateSeconds', 1);
    seconds.value++;
  }, MILLISECONDS_IN_SECONDS);
}

function stop() {
  if (typeof isRunning.value === 'number') clearInterval(isRunning.value);
  isRunning.value = null;
}

function reset() {
  emit('updateSeconds', -seconds.value);
  stop();
  seconds.value = 0;
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :color="ButtonColor.DANGER" @click="reset" :disabled="!seconds"
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
