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
    console.log(res.data);
  });

function goToAddAnime(id: any) {
  router.push({ name: "addAnime", params: { animeId: id } });
}
</script>

<template>
  <LoadingPage v-if="anime == undefined" />
  <template v-else>
    <div
      class="container mx-auto rounded-xl p-5 mt-10 bg-abyss-blue-2 flex flex-col gap-4"
    >
      <div class="md:flex gap-4">
        <div>
          <img
            :src="anime.images.jpg.image_url"
            class="min-w-[235px] h-[335px]"
            alt=""
          />
        </div>
        <div class="space-y-5">
          <div class="font-bold text-3xl text-abyss-purple-4">
            {{ anime.title }}
          </div>
          <div class="space-y-2">
            <div v-if="anime.title_synonyms.length > 0">
              <span class="font-bold text-blue-200">Alternative Names: </span>
              <span v-for="(synonym, index) in anime.title_synonyms"
                >{{ synonym }}
                {{ index < anime.title_synonyms.length - 1 ? ", " : "" }}</span
              >
            </div>
            <div>
              <span class="font-bold text-blue-200"> Genre/s: </span>
              <span v-for="(genre, index) in anime.genres"
                >{{ genre.name }}
                {{ index < anime.genres.length - 1 ? ", " : "" }}</span
              >
            </div>
            <div>
              <span class="font-bold text-blue-200"> Episodes: </span>
              {{ anime.episodes }}
            </div>
            <div>
              <span class="font-bold text-blue-200"> Duration: </span>
              {{ anime.duration }}
            </div>
            <div>{{ anime.status }}</div>
          </div>

          <button
            class="bg-abyss-purple-3 py-1 px-4"
            @click="goToAddAnime(anime.id)"
          >
            Add To List
          </button>
        </div>
      </div>
      <div class="">{{ anime.synopsis }}</div>
    </div>
  </template>
</template>
