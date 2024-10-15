import { type ComputedRef, type Ref, computed, ref } from 'vue';

import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECONDS,
  SECONDS_IN_DAY,
} from '@/constants/number.constants';

export const now: Ref<Date> = ref(new Date());

export const secondsSinceMidnightInPercentage: ComputedRef<number> = computed(
  (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0));

const secondsSinceMidnight: ComputedRef<number> = computed(() => {
  return (now.value.getTime() - midnight.value) / MILLISECONDS_IN_SECONDS;
});

let timer: number;

export function startTimer(): void {
  now.value = new Date();

  timer = setInterval(
    () => (now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECONDS)),
    MILLISECONDS_IN_SECONDS,
  );
}

export function stopTimer(): void {
  clearInterval(timer);
}
