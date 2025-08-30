<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "./stores/auth";
import LoadingPage from "./pages/status/LoadingPage.vue";
import { onMounted } from "vue";
import { axiosPrivate } from "./api/axios";

const authStore = useAuthStore();

onMounted(async () => {
  const res = await axiosPrivate.get("/api/health");

  if (res.status == 200) {
    console.log("DB Connected Successfuly!");
  } else {
    console.log("DB Connection Failed: " + res.data);
  }
});
</script>

<template>
  <div class="min-h-dvh w-full bg-abyss-blue-1 text-white">
    <RouterView v-slot="{ Component }">
      <template v-if="authStore.refresh.loading">
        <LoadingPage />
      </template>
      <template v-else>
        <Navbar />
        <component :is="Component" />
      </template>
    </RouterView>
  </div>
</template>
