<script setup lang="ts">
import { ref } from 'vue';
import NavItem from './NavItem.vue';
import type { TNavItem } from '@/types/TNavItem.types.ts';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants/page.constants';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

const navItems: TNavItem[] = [
  { page: PAGE_TIMELINE, icon: ClockIcon },
  { page: PAGE_ACTIVITIES, icon: ListBulletIcon },
  { page: PAGE_PROGRESS, icon: ChartBarIcon },
];

const currentPage = ref<string>(normalizePageHash());

function handleNavClick(page: string): void {
  currentPage.value = page;
}

function normalizePageHash(): string {
  const hash = window.location.hash.slice(1);

  if (navItems.some((item) => item.page === hash)) return hash;

  window.location.hash = PAGE_TIMELINE;
  return PAGE_TIMELINE;
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
