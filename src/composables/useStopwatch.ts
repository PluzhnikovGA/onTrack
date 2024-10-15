import { type Ref, ref } from 'vue';

import { MILLISECONDS_IN_SECONDS } from '@/constants/number.constants';

type TUseStopWatch = {
  seconds: Ref<number, number>;
  isRunning: Ref<number | null, number | null>;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

export function useStopwatch(initialSeconds: number): TUseStopWatch {
  const seconds = ref<number>(initialSeconds);
  const isRunning = ref<number | null>(null);
  const temp = 1;

  function start(): void {
    isRunning.value = setInterval(() => {
      seconds.value += temp;
    }, MILLISECONDS_IN_SECONDS);
  }

  function stop(): void {
    if (typeof isRunning.value === 'number') clearInterval(isRunning.value);
    isRunning.value = null;
  }

  function reset(): void {
    stop();
    seconds.value = 0;
  }

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  };
}
