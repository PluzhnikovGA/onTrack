<script setup lang="ts">
import { computed } from 'vue';

import { now } from '@/utils/time.utils';
import { scrollToHour } from '@/utils/timeline.utils';

const props = defineProps<{
  hour: number;
}>();

const hourLinkClasses = computed(() => [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.hour === now.value.getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
]);

const formattedHour = `${props.hour.toString().padStart(2, '0')}:00`;
</script>

<template>
  <a href="#" :class="hourLinkClasses" @click.prevent="scrollToHour(hour)">{{ formattedHour }}</a>
</template>
