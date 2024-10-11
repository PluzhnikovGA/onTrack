<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';

import BaseButton from '@/components/BaseButton.vue';

import { ButtonColor, type TOption } from '@/types/base-components.types.ts';

defineProps<{
  selected: string | number | null;
  options: TOption[];
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'select', value: string | number | null): void;
}>();

function changeValue(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit('select', target.value);
}

function defaultValue(): void {
  emit('select', null);
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton @click="defaultValue" :color="ButtonColor.NEUTRAL">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl" @change="changeValue">
      <option :selected="selected === null" disabled value="">{{ placeholder }}</option>
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
