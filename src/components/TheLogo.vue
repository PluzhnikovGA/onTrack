<script setup>
import { navigate } from '@/router/router';

import { PAGE_TIMELINE } from '@/constants/page.constants';
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)"
    ><img src="@/assets/image/logo.png" alt="Logo" class="h-9"
  /></a>
</template>
