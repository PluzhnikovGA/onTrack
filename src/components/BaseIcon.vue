<script setup lang="ts">
import type { IconNames } from '@/types/base-components.types.ts';

import { ICONS } from '@/constants/icons.constants';

const props = defineProps<{
  name: IconNames;
  classes?: string;
}>();

const className = props.classes || 'h-8';
</script>

<template>
  <component :is="ICONS[name]" :class="className" />
</template>
