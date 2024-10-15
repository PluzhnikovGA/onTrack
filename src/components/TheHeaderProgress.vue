<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue';

import { navigate } from '@/router/router';

import { useTotalProgress } from '@/composables/useTotalProgress';

import { IconNames } from '@/types/baseComponents.types';

import { HUNDRED_PERCENT } from '@/constants/number.constants';
import { PAGE_PROGRESS } from '@/constants/page.constants';

const { percentage, colorClass } = useTotalProgress();
</script>

<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
    <div v-if="percentage === HUNDRED_PERCENT" class="flex items-center gap-1">
      Day complete! <BaseIcon :name="IconNames.CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>
        Progress: <span class="font-mono">{{ percentage }}%</span>
      </div>
      <div :class="`h-3 w-3 rounded-full ${colorClass}`" />
    </div>
  </a>
</template>
