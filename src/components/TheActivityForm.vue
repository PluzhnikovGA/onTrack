<script setup lang="ts">
import { nextTick, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

const activity = ref<string>('');

const emit = defineEmits<{
  (e: 'submit', activity: string): void;
}>();

async function submit() {
  if (activity.value.trim().length > 0) {
    emit('submit', activity.value);
    activity.value = '';
    await nextTick();
    window.scrollTo(0, document.body.scrollHeight);
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
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
