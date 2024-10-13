<script setup>
import ProgressItem from '@/components/ProgressItem.vue';
import TheProgressEmptyState from '@/components/TheProgressEmptyState.vue';

import { trackedActivities } from '@/utils/activity.utils';
</script>

<template>
  <ul v-if="trackedActivities.length > 0" class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
  <TheProgressEmptyState v-else />
</template>
