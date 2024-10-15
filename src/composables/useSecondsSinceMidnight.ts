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

type TUseSecondsSinceMidnight = {
  secondsSinceMidnightInPercentage: ComputedRef<number>;
};

export function useSecondsSinceMidnight(): TUseSecondsSinceMidnight {
  const secondsSinceMidnight: Ref<number> = ref(calculateSecondsSinceMidnight());
  let timer: number;

  const secondsSinceMidnightInPercentage: ComputedRef<number> = computed(
    (): number => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
  );

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0;
    }
  });

  onActivated(() => {
    timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECONDS);

    secondsSinceMidnight.value = calculateSecondsSinceMidnight();
  });

  onDeactivated(() => clearInterval(timer));

  function calculateSecondsSinceMidnight(): number {
    const now = new Date();

    return (
      SECONDS_IN_HOUR * now.getHours() + SECONDS_IN_MINUTE * now.getMinutes() + now.getSeconds()
    );
  }

  return {
    secondsSinceMidnightInPercentage,
  };
}
