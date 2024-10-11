<script setup lang="ts">
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';

import BaseButton from '@/components/BaseButton.vue';

import { formatSeconds } from '@/utils/timeUtils';

import { ButtonColor } from '@/types/base-components.types.ts';

defineProps<{
  seconds: number;
}>();
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :color="ButtonColor.DANGER"><ArrowPathIcon class="h-8" /></BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton :color="ButtonColor.WARNING"><PauseIcon class="h-8" /></BaseButton>
    <BaseButton :color="ButtonColor.SUCCESS"><PlayIcon class="h-8" /></BaseButton>
  </div>
</template>
