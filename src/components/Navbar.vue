<script setup lang="ts">
import LogoutButton from "../pages/auth/LogoutButton.vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
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
        <template v-if="!authStore.auth.isLoggedIn">
          <RouterLink to="/login"><div class="px-2">LOGIN</div></RouterLink>
          <RouterLink to="/register"
            ><div class="px-2">REGISTER</div></RouterLink
          >
        </template>

        <LogoutButton v-if="authStore.auth.isLoggedIn" />
      </div>
    </div>
  </div>
</template>
