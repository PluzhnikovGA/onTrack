<script setup lang="ts" generic="T extends number | string">
import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { ButtonColor, IconName, type TSelectOption } from '@/types/baseComponents.types';

defineProps<{
  selected: T | null;
  options: TSelectOption<T>[];
  placeholder: string;
}>();

const emit = defineEmits<{
  select: [value: T | null];
}>();

function changeValue(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit('select', target.value as T);
}

function defaultValue(): void {
  emit('select', null);
}
</script>

<template>
  <div class="flex gap-2">
    <BaseButton @click="defaultValue" :color="ButtonColor.NEUTRAL">
      <BaseIcon :name="IconName.X_MARK" />
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
