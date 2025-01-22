<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

async function handleLogout() {
  loading.value = true;
  await authStore.logoutUser();
  loading.value = false;
  router.push("/");
}
</script>

<template>
  <button
    class="hover:bg-abyss-purple-2 px-2"
    :class="{ 'bg-abyss-blue-3 font-bold': loading }"
    @click="handleLogout"
  >
    LOGOUT
  </button>
</template>
