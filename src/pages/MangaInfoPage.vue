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
const manga = ref<any>(null);

fetch(`https://api.jikan.moe/v4/manga/${route.params.mangaId}`)
  .then((res) => res.json())
  .then((res) => {
    manga.value = res.data;
  });

function goToAddManga(id: any) {
  router.push({ name: "addManga", params: { mangaId: id } });
}
</script>

<template>
  <LoadingPage v-if="manga == undefined" />
  <template v-else>
    <div
      class="container mx-auto rounded-xl p-5 mt-10 flex gap-4 bg-abyss-blue-3"
    >
      <div>
        <img
          :src="manga.images.jpg.image_url"
          class="min-w-[235px] h-[335px]"
          alt=""
        />
      </div>
      <div>
        <div class="font-bold text-3xl">Title: {{ manga.title }}</div>
        <div>
          Alternative Names:
          <span v-for="(synonym, index) in manga.title_synonyms"
            >{{ synonym }}
            {{ index < manga.title_synonyms.length - 1 && ", " }}</span
          >
        </div>
        <div>{{ manga.status }}</div>
        <div>{{ manga.synopsis }}</div>
        <button
          class="bg-abyss-purple-2 py-1 px-4"
          @click="goToAddManga(manga.id)"
        >
          Add To List
        </button>
      </div>
    </div>
  </template>
</template>
