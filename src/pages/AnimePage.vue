<script setup lang="ts">
import { ref } from "vue";
import ItemList from "../components/ItemList.vue";

let topAnime = ref<any[]>([]);

fetch("https://api.jikan.moe/v4/anime?limit=20")
  .then((res) => res.json())
  .then((res) => {
    topAnime.value = res.data;
  });
</script>

<template>
  <ItemList :list="topAnime" class="mt-40" />
</template>
