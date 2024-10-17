<script setup>
import BaseIcon from '@/components/BaseIcon.vue';

import { navigate } from '@/router/router';

import { useTotalProgress } from '@/composables/useTotalProgress';

import { IconName } from '@/types/baseComponents.types';
import { PageName } from '@/types/navigation.types';

import { HUNDRED_PERCENT } from '@/constants/number.constants';

const { percentage, colorClass } = useTotalProgress();
</script>

<template>
  <a :href="`#${PageName.PROGRESS}`" class="text-sm" @click="navigate(PageName.PROGRESS)">
    <div v-if="percentage === HUNDRED_PERCENT" class="flex items-center gap-1">
      Day complete! <BaseIcon :name="IconName.CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>
        Progress: <span class="font-mono">{{ percentage }}%</span>
      </div>
      <div :class="`h-3 w-3 rounded-full ${colorClass}`" />
    </div>
  </a>
</template>
