<script setup lang="ts">
import ProgressItem from '@/components/ProgressItem.vue';

import { trackedActivities } from '@/utils/activity.utils';
</script>

<template>
  <ul class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
</template>
