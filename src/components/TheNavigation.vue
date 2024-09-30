<script setup lang="ts">
import { DefineComponent } from 'vue';

import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

type TNavItem = {
  page: string;
  icon: DefineComponent;
};

const navItems: TNavItem[] = [
  { page: 'timeline', icon: ClockIcon },
  { page: 'activities', icon: ListBulletIcon },
  { page: 'progress', icon: ChartBarIcon },
];
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <li v-for="item in navItems" :key="item.page" class="flex-1">
        <a :href="`#${item.page}`" class="flex flex-col items-center p-2 text-xs capitalize">
          <component :is="item.icon" class="h-6 w-6" />
          {{ item.page }}
        </a>
      </li>
    </ul>
  </nav>
</template>
