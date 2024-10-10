<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue';

defineProps<{
  activities: string[];
}>();

const emit = defineEmits<{
  (e: 'deleteActivity', activity: string): void;
}>();

function deleteActivity(activity: string): void {
  emit('deleteActivity', activity);
}
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="deleteActivity(activity)"
      />
    </ul>
  </div>
</template>
