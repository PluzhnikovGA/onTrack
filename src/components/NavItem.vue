<script setup lang="ts">
import { computed } from 'vue';

import BaseIcon from '@/components/BaseIcon.vue';

import { currentPage, navigate } from '@/router/router';

import { scrollToCurrentHour } from '@/utils/timeline.utils';

import { PageName, type TNavItem } from '@/types/navigation.types';

const props = defineProps<{ navItem: TNavItem }>();

const classes = computed<(string | { 'pointer-events-none': boolean })[]>(
  (): (string | { 'pointer-events-none': boolean })[] => [
    'flex flex-col items-center p-2 text-xs capitalize ',
    props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
    {
      'pointer-events-none':
        currentPage.value !== PageName.TIMELINE && currentPage.value === props.navItem.page,
    },
  ],
);

function handleClick(): void {
  props.navItem.page === PageName.TIMELINE && currentPage.value === PageName.TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page);
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>
