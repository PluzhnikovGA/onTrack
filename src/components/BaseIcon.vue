<script setup lang="ts">
import type { IconName } from '@/types/baseComponents.types';

import { ICONS } from '@/constants/icons.constants';

defineProps<{
  name: IconName;
}>();
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
