<template>
  <div class="mt-7">
    <ul>
      <li
        v-for="i in 24"
        :key="`hour_${i - 1}`"
        class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4"
      >
        <a
          href="#"
          class="absolute -top-4 left-1/2 -translate-x-1/2 rounded bg-gray-100 px-2 font-mono text-lg text-gray-500"
        >
          {{ i - 1 }}:00
        </a>
      </li>
    </ul>
  </div>
</template>
