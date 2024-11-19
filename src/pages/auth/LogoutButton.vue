<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  await authStore.logoutUser();
  router.push("/");
}
</script>

<template>
  <button @click="handleLogout">LOGOUT</button>
</template>
