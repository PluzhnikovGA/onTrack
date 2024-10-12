<script setup>
import ActivityItem from '@/components/ActivityItem.vue';
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue';
import TheActivityForm from '@/components/TheActivityForm.vue';

import { activities } from '@/utils/activity.utils';
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length > 0" class="grow divide-y">
      <ActivityItem
        v-for="(activity, index) in activities"
        :key="`${activity.id}_${index}`"
        :activity="activity"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm />
  </div>
</template>
