<script setup lang="ts">
import type { IconNames } from '@/types/baseComponents.types';

import { ICONS } from '@/constants/icons.constants';

defineProps<{
  name: IconNames;
}>();
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
