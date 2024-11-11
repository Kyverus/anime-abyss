<script setup lang="ts">
import LogoutButton from "../pages/auth/LogoutButton.vue";
</script>

<template>
  <div class="bg-black text-white">
    <div class="container mx-auto flex justify-between">
      <div class="font-bold p-5">
        <RouterLink to="/">ANIME ABYSS</RouterLink>
      </div>
      <div class="flex items-center">
        <RouterLink to="/anime"><div class="px-5">ANIME</div></RouterLink>
        <RouterLink to="/manga"><div class="px-5">MANGA</div></RouterLink>
        <RouterLink to="/listentries">
          <div class="px-5">LIST ENTRIES</div>
        </RouterLink>
      </div>
      <div class="flex items-center justify-center">
        <RouterLink to="/login"><div class="px-2">LOGIN</div></RouterLink>
        <RouterLink to="/register"><div class="px-2">REGISTER</div></RouterLink>
        <LogoutButton />
      </div>
    </div>
  </div>
</template>
