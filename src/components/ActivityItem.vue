<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { PERIOD_SELECT_OPTIONS } from '@/constants/select.constants';

defineProps<{
  activity: string;
}>();

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
        :options="PERIOD_SELECT_OPTIONS"
        :selected="secondsToComplete"
        @select="secondsToComplete = $event"
      />
    </div>
  </li>
</template>
