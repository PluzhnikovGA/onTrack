<script setup lang="ts">
import {
  type ComputedRef,
  type Ref,
  computed,
  onActivated,
  onDeactivated,
  ref,
  watchEffect,
} from 'vue';

import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECONDS,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants/number.constants';

const secondsSinceMidnight: Ref<number> = ref(calculateSecondsSinceMidnight());
const indicatorRef: Ref<HTMLHRElement | null> = ref(null);

let timer: number;

onActivated(() => {
  timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECONDS);

  secondsSinceMidnight.value = calculateSecondsSinceMidnight();
});

onDeactivated(() => clearInterval(timer));

const topOffset: ComputedRef<number> = computed(
  (): number => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT,
);

const secondsSinceMidnightInPercentage: ComputedRef<number> = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

function calculateSecondsSinceMidnight(): number {
  const now = new Date();

  return SECONDS_IN_HOUR * now.getHours() + SECONDS_IN_MINUTE * now.getMinutes() + now.getSeconds();
}

function getTimelineHeight(): number {
  return indicatorRef.value?.parentElement?.getBoundingClientRect().height || 0;
}

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0;
  }
});
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
