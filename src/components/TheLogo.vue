<script setup lang="ts">
import { currentPage, navigate } from '@/router/router';

import { scrollToCurrentHour } from '@/utils/timeline.utils';

import { PageName } from '@/types/navigation.types';

function handleClick(): void {
  currentPage.value === PageName.PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(PageName.PAGE_TIMELINE);
}
</script>

<template>
  <a :href="`#${PageName.PAGE_TIMELINE}`" @click="handleClick"
    ><img src="@/assets/image/logo.png" alt="Logo" class="h-9"
  /></a>
</template>
