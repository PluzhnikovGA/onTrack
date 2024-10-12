<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import { nextTick, ref } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

import { createActivity } from '@/utils/activity.utils';

const activity = ref<string>('');

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
