<script setup lang="ts"></script>

<template>
  <div class="bg-black text-white">
    <div class="container mx-auto flex justify-between">
      <div class="font-bold p-5">
        <RouterLink to="/">ANIME ABYSS</RouterLink>
      </div>
      <div class="flex items-center">
        <RouterLink to="/anime"><div class="px-5">ANIME</div></RouterLink>
        <RouterLink to="/manga"><div class="px-5">MANGA</div></RouterLink>
        <RouterLink to="/"><div class="px-5">EXTRA</div></RouterLink>
      </div>
      <div></div>
    </div>
  </div>
</template>
