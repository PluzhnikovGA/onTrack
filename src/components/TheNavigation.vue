<script setup lang="ts">
import { ref } from 'vue';
import NavItem from './NavItem.vue';
import type { TNavItem } from '../types/TNavItem.types.ts';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

const navItems: TNavItem[] = [
  { page: 'timeline', icon: ClockIcon },
  { page: 'activities', icon: ListBulletIcon },
  { page: 'progress', icon: ChartBarIcon },
];

const currentPage = ref<string>('timeline');

function handleNavClick(page: string) {
  currentPage.value = page;
}
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="item in navItems"
        :class="{ 'bg-gray-200 pointer-events-none': currentPage === item.page }"
        @click="handleNavClick(item.page)"
        :key="item.page"
        :href="`#${item.page}`"
        :page="item.page"
        :icon="item.icon"
      />
    </ul>
  </nav>
</template>
