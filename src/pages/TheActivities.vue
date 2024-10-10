<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue';
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue';
import TheActivityForm from '@/components/TheActivityForm.vue';

defineProps<{
  activities: string[];
}>();

const emit = defineEmits<{
  (e: 'deleteActivity', activity: string): void;
  (e: 'createActivity', newActivity: string): void;
}>();

function deleteActivity(activity: string): void {
  emit('deleteActivity', activity);
}

function createActivity(event: string): void {
  const value = event.trim();
  if (value.length > 0) {
    emit('createActivity', value);
  }
}
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length > 0" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="deleteActivity(activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="createActivity($event)" />
  </div>
</template>
