<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <a href="#"><img src="./assets/image/logo.png" alt="Logo" class="h-9" /></a>
    <a href="#" class="text-sm">
      <div v-if="true" class="flex items-center gap-1">
        Day complete! <CheckCircleIcon class="h-7 text-green-500" />
      </div>
      <div v-else class="flex items-center gap-1">
        <div>Progress: <span class="font-mono">20%</span></div>
        <div class="h-3 w-3 rounded-full bg-red-500"></div>
      </div>
    </a>
  </header>
  <main class="flex flex-col flex-grow">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. In, saepe molestiae incidunt ducimus
    nisi laboriosam perferendis aliquid, porro ipsa iure cupiditate hic alias velit possimus
    voluptates quas blanditiis culpa. Unde. Lorem ipsum dolor, sit amet consectetur adipisicing
    elit. Nulla laborum corporis dolorum omnis natus commodi earum amet facilis ratione quaerat
    neque, accusantium, cum repudiandae debitis quas consectetur suscipit necessitatibus inventore?
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda doloribus et quam incidunt
    eum fugiat, maxime dolorum eveniet blanditiis sequi at quasi voluptas consequuntur, vero sit id
    doloremque vitae quae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore,
    praesentium, quod totam doloremque cum unde rem quo odit corporis porro odio quis ex suscipit,
    ad mollitia blanditiis consequuntur amet optio? Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Quasi perspiciatis dicta tempora animi error tempore enim ad aperiam molestias
    unde sunt quae, neque nisi quis sit quos, nulla soluta asperiores. Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Quo aspernatur omnis sequi hic, doloremque atque dolorum maxime
    repellat voluptatum quaerat architecto voluptas provident et molestiae quae dolore, sed
    excepturi dignissimos? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta incidunt
    ex deserunt quod quis quam placeat! Laborum natus est hic labore beatae. Iure, eum vitae?
    Reprehenderit laudantium sit laborum repellendus! Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Rerum perspiciatis, illo minus aliquam eligendi accusantium ipsum ab possimus
    aliquid, id velit rem ullam consectetur sed quam quod fugit inventore eius! Lorem ipsum dolor
    sit amet, consectetur adipisicing elit. Provident voluptates optio, odio itaque possimus porro
    amet eius fugiat omnis, illum voluptas fuga rem minus. Dolor reprehenderit consequatur similique
    rerum debitis.
  </main>

  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <li class="flex-1">
        <a href="#timeline" class="flex flex-col items-center p-2 text-xs capitalize">
          <ClockIcon class="h-6 w-6" /> timeline
        </a>
      </li>
      <li class="flex-1">
        <a href="#activities" class="flex flex-col items-center p-2 text-xs capitalize">
          <ListBulletIcon class="h-6 w-6" /> activities
        </a>
      </li>
      <li class="flex-1">
        <a href="#progress" class="flex flex-col items-center p-2 text-xs capitalize">
          <ChartBarIcon class="h-6 w-6" /> progress
        </a>
      </li>
    </ul>
  </nav>
</template>
