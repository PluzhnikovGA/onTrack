<script setup lang="ts">
import { ButtonColor } from '@/types/baseComponents.types';

const props = withDefaults(
  defineProps<{
    color?: ButtonColor;
  }>(),
  {
    color: ButtonColor.PRIMARY,
  },
);

const classes = `${props.color} rounded p-3 disabled:cursor-not-allowed disabled:opacity-50`;
</script>

<template>
  <button :class="`${classes}`">
    <slot />
  </button>
</template>
