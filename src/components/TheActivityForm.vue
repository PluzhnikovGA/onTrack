<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import { inject, nextTick, ref } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

import type { TCreateActivity } from '@/types/activity.types';

import { createActivityKey } from '../keys';

const activity = ref<string>('');

const createActivity = inject<TCreateActivity>(createActivityKey)!;

async function handleSubmit() {
  const newActivity = activity.value.trim();
  if (newActivity.length > 0) {
    createActivity(newActivity);
    activity.value = '';
    await nextTick();
    window.scrollTo(0, document.body.scrollHeight);
  }
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4"
  >
    <input
      v-model="activity"
      type="text"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="activity.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
