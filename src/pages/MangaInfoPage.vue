<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>This is Manga {{ route.params.mangaId }}</div>
</template>
