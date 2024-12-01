<script lang="ts" setup>
import AnimeEntries from "./AnimeEntries.vue";
import MangaEntries from "./MangaEntries.vue";
import { ref } from "vue";

const entrySection = ref("anime");

function clickAnimeSection() {
  entrySection.value = "anime";
}

function clickMangaSection() {
  entrySection.value = "manga";
}
</script>

<template>
  <button
    class="flex container mx-auto rounded-2xl border-2 border-abyss-purple-3 overflow-hidden mt-10"
  >
    <div
      class="w-1/2 py-2"
      :class="{ 'bg-abyss-purple-2': entrySection == 'anime' }"
      @click="clickAnimeSection"
    >
      ANIME
    </div>
    <div
      class="w-1/2 py-2"
      :class="{ 'bg-abyss-purple-2': entrySection == 'manga' }"
      @click="clickMangaSection"
    >
      MANGA
    </div>
  </button>
  <template v-if="entrySection == 'anime'">
    <AnimeEntries />
  </template>
  <template v-if="entrySection == 'manga'">
    <MangaEntries />
  </template>
</template>
