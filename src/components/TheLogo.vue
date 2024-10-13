<script setup lang="ts">
import { currentPage, navigate } from '@/router/router';

import { scrollToCurrentHour } from '@/utils/timeline.utils';

import { PAGE_TIMELINE } from '@/constants/page.constants';

function handleClick() {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE);
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick"
    ><img src="@/assets/image/logo.png" alt="Logo" class="h-9"
  /></a>
</template>
