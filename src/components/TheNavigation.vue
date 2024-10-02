<script setup lang="ts">
import type { TNavItem } from '@/types/NavItem.types';
import NavItem from './NavItem.vue';

defineProps<{
  currentPage: string;
  navItems: TNavItem[];
}>();

const emit = defineEmits<{
  (e: 'navigate', page: string): void;
}>();

function handleNavClick(page: string): void {
  emit('navigate', page);
}
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="item in navItems"
        :class="{ 'pointer-events-none bg-gray-200': currentPage === item.page }"
        @click="handleNavClick(item.page)"
        :key="item.page"
        :href="`#${item.page}`"
        :page="item.page"
        :icon="item.icon"
      />
    </ul>
  </nav>
</template>
