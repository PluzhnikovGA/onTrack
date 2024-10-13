<script setup lang="ts">
import type { IconNames } from '@/types/base-components.types';

import { ICONS } from '@/constants/icons.constants';

defineProps<{
  name: IconNames;
}>();
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
