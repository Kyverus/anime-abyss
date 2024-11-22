<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import LoadingPage from "./status/LoadingPage.vue";

// interface Item {
//   mal_id?: String;
//   title?: string;
//   images?: any;
//   title_synonyms?: [];
// }

const route = useRoute();
const router = useRouter();
const anime = ref<any>(null);

fetch(`https://api.jikan.moe/v4/anime/${route.params.animeId}`)
  .then((res) => res.json())
  .then((res) => {
    anime.value = res.data;
  });

function goToAddAnime(id: any) {
  router.push({ name: "addAnime", params: { animeId: id } });
}
</script>

<template>
  <LoadingPage v-if="anime == undefined" />
  <template v-else>
    <div
      class="container mx-auto rounded-xl p-5 mt-10 flex gap-4 bg-abyss-blue-3"
    >
      <div>
        <img
          :src="anime.images.jpg.image_url"
          class="min-w-[235px] h-[335px]"
          alt=""
        />
      </div>
      <div>
        <div class="font-bold text-3xl">Title: {{ anime.title }}</div>
        <div>
          Alternative Names:
          <span v-for="(synonym, index) in anime.title_synonyms"
            >{{ synonym }}
            {{ index < anime.title_synonyms.length - 1 && ", " }}</span
          >
        </div>
        <div>{{ anime.status }}</div>
        <div>{{ anime.synopsis }}</div>
        <button class="bg-abyss-purple-2 py-1 px-4" @click="goToAddAnime(anime.id)">
          Add To List
        </button>
      </div>
    </div>
  </template>
</template>
