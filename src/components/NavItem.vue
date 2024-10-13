<script setup lang="ts">
import { computed } from 'vue';

import BaseIcon from '@/components/BaseIcon.vue';

import { currentPage, navigate } from '@/router/router';

import type { TNavItem } from '@/types/navigation.types';

const props = defineProps<{ navItem: TNavItem }>();

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize ',
  { 'pointer-events-none bg-gray-200': currentPage.value === props.navItem.page },
]);
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>
