<script setup lang="ts">
import { computed } from 'vue';

import { formatSeconds } from '@/utils/time.utils';
import { calculateTrackedActivitySeconds } from '@/utils/timeline.utils';

import type { TActivity } from '@/types/activity.types';

const props = defineProps<{
  activity: TActivity;
}>();

const classes = computed(
  () => `flex items-center rounded px-2 font-mono text-xl ${colorClasses.value}`,
);

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
);

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`);

const secondsDiff = computed(
  () => calculateTrackedActivitySeconds(props.activity.id) - props.activity.secondsToComplete,
);

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'));
</script>

<template>
  <div v-if="activity.secondsToComplete" :class="classes">
    {{ seconds }}
  </div>
</template>
