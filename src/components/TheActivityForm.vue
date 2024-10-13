<script setup lang="ts">
import { nextTick, ref } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon.vue';

import { createActivity } from '@/utils/activity.utils';

import { IconNames } from '@/types/base-components.types.ts';

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
      <BaseIcon :name="IconNames.PLUS" />
    </BaseButton>
  </form>
</template>
