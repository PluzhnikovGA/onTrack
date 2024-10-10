<script setup lang="ts">
import { ButtonColor } from '@/types/BaseButton.types';

const props = withDefaults(
  defineProps<{
    color?: ButtonColor;
  }>(),
  {
    color: ButtonColor.NEUTRAL,
  },
);
</script>

<template>
  <button :class="`${props.color} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`">
    <slot></slot>
  </button>
</template>
