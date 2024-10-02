<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import type { TOption } from '@/types/TBaseSelector.types';
import { XMarkIcon } from '@heroicons/vue/24/outline';

defineProps<{
  selected: number;
  options: TOption[];
  placeholder: string;
}>();
</script>

<template>
  <div class="flex gap-2">
    <BaseButton>
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl">
      <option selected disabled value="">{{ placeholder }}</option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
