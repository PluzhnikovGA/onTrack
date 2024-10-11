<script setup lang="ts">
import { useAttrs } from 'vue';

import type { TNavItem } from '@/types/navigation.types';

const props = defineProps<TNavItem>();
const attrs = useAttrs();
const emit = defineEmits<{
  (e: 'click', page: string): void;
}>();

function handleClick() {
  emit('click', props.page);
}
</script>

<template>
  <li class="flex-1" @click="handleClick">
    <a v-bind="attrs" class="flex flex-col items-center p-2 text-xs capitalize">
      <component :is="props.icon" class="h-6 w-6" />
      {{ props.page }}
    </a>
  </li>
</template>
