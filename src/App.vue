<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="min-h-dvh w-full bg-gradient-to-b from-slate-950 to-black to-40%">
    <Navbar />
    <RouterView />
  </div>
</template>
