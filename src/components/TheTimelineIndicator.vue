<script setup lang="ts">
import { type ComputedRef, type Ref, computed, ref } from 'vue';

import { secondsSinceMidnightInPercentage } from '@/utils/timer.utils';

import { HUNDRED_PERCENT } from '@/constants/number.constants';

const indicatorRef: Ref<HTMLHRElement | null> = ref(null);

const topOffset: ComputedRef<number> = computed(
  (): number => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT,
);

function getTimelineHeight(): number {
  return indicatorRef.value?.parentElement?.getBoundingClientRect().height || 0;
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
