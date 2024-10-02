<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import type { TOption } from '@/types/BaseSelector.types';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const activities: string[] = ['Coding', 'Reading', 'Training'];

const periodSelectOptions: TOption[] = [
  { value: 15, label: '0:15' },
  { value: 20, label: '0:20' },
  { value: 25, label: '0:25' },
  { value: 30, label: '0:30' },
];

const selectedActivityId = ref<number | null>(null);
</script>

<template>
  <div>
    <ul class="divide-y">
      <li v-for="activity in activities" :key="activity" class="flex flex-col gap-2 p-4">
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
            :selected="selectedActivityId"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
