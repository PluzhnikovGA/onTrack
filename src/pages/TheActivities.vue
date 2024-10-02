<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue';

defineProps<{
  activities: string[];
}>();
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>
