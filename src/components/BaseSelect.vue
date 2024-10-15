<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { ButtonColor, IconNames, type TOption } from '@/types/baseComponents.types';

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
      <BaseIcon :name="IconNames.X_MARK" />
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
