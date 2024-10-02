<script setup lang="ts">
import { generateTimelineItems } from '@/utils/generateTimelineItems';

const timelineItems: number[] = generateTimelineItems();
</script>

<template>
  <div class="mt-7">
    <ul>
      <li
        v-for="time in timelineItems"
        :key="`hour_${time}`"
        class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
      >
        <a
          href="#"
          class="absolute -top-4 left-1/2 -translate-x-1/2 rounded bg-gray-100 px-2 font-mono text-lg text-gray-500"
        >
          {{ time }}:00
        </a>
      </li>
    </ul>
  </div>
</template>
