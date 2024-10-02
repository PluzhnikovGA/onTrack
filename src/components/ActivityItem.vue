<script setup lang="ts">
import type { TOption } from '@/types/BaseSelector.types';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

defineProps<{
  activity: string;
}>();

const periodSelectOptions: TOption[] = [
  { value: 15, label: '0:15' },
  { value: 20, label: '0:20' },
  { value: 25, label: '0:25' },
  { value: 30, label: '0:30' },
];

const secondsToComplete = ref<number | null>(null);
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton>
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        placeholder="h:mm"
        :options="periodSelectOptions"
        :selected="secondsToComplete"
        @select="secondsToComplete = $event"
      />
    </div>
  </li>
</template>
