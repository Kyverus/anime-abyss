<script setup lang="ts">
import { ref } from "vue";
import ItemList from "../components/ItemList.vue";

let topManga = ref<any[]>([]);
fetch("https://api.jikan.moe/v4/manga?limit=20")
  .then((res) => res.json())
  .then((res) => {
    topManga.value = res.data;
  });
</script>

<template>
  <ItemList :list="topManga" class="mt-40" />
</template>
