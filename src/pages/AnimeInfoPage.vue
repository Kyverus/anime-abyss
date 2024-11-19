<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>This is Anime {{ route.params.animeId }}</div>
</template>
