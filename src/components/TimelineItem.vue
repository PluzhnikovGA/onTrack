<script setup lang="ts">
import type { TTimelineItem } from '@/types/TimelineItem.types';
import BaseSelect from '@/components/BaseSelect.vue';
import TimelineHour from '@/components/TimelineHour.vue';
import type { TOption } from '@/types/BaseSelector.types';
import type { TActivity } from '@/types/Activities.types';
import { ref, watch } from 'vue';

const props = defineProps<{
  timelineItem: TTimelineItem;
  activitySelectOptions: TOption[];
  activities: TActivity[];
}>();

const emit = defineEmits<{
  (e: 'selectActivity', activity: TActivity): void;
}>();

const selectedActivity = ref<string | null>(props.timelineItem.activityId);

function selectActivity(id: string | number | null): void {
  const value = (): string | null => {
    switch (true) {
      case id === null:
        return null;
      case isNaN(Number(id)) && typeof id === 'string':
        return id;
      default:
        return null;
    }
  };

  const activity: TActivity | undefined = props.activities.find(
    (activity) => activity.id === value(),
  );

  if (activity === undefined) return;

  emit('selectActivity', activity);
}

watch(
  () => props.timelineItem.activityId,
  (newActivityId) => {
    selectedActivity.value = newActivityId;
  },
  { immediate: true },
);
</script>

<template>
  <li class="border-grey-200 relative flex flex-col gap-2 border-t px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :placeholder="`Rest`"
      :options="activitySelectOptions"
      :selected="selectedActivity"
      @select="selectActivity($event)"
    />
  </li>
</template>
