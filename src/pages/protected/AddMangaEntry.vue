<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import LoadingPage from "../status/LoadingPage.vue";
import { useMangaEntryStore } from "../../stores/mangaentries";

const mangaEntryStore = useMangaEntryStore();
const route = useRoute();
const router = useRouter();

const manga = ref<any>(null);
const userInput = reactive({
  rating: 0,
  category: "",
});

fetch(`https://api.jikan.moe/v4/manga/${route.params.mangaId}`)
  .then((res) => res.json())
  .then((res) => {
    manga.value = res.data;
  });

async function addMangaEntry() {
  const genres = manga.value.genres.map((genre: any) => genre.name).join(",");

  const res = await mangaEntryStore.addMangaEntry({
    mangaId: manga.value.mal_id,
    title: manga.value.title,
    imageURL: manga.value.images.jpg.image_url,
    genres: genres,
    rating: userInput.rating,
    category: userInput.category,
  });

  if (res.success) {
    router.push("/manga");
  } else {
    console.log(res.errors);
  }
}
</script>

<template>
  <LoadingPage v-if="manga == undefined" />
  <template v-else>
    <div class="container mx-auto mt-10 flex gap-5 bg-abyss-blue-3 p-5">
      <img
        :src="manga.images.jpg.image_url"
        class="min-w-[235px] h-[335px]"
        alt=""
      />
      <div class="space-y-2">
        <div class="font-bold text-3xl text-abyss-purple-1">
          {{ manga.title }}
        </div>
        <ul>
          <li v-for="genre in manga.genres" class="list-disc list-inside">
            {{ genre.name }}
          </li>
        </ul>

        <div class="grid grid-cols-2 items-center gap-2">
          <label for="rating">Rating:</label>
          <select
            id="rating"
            class="text-abyss-purple-1 rounded-xl px-2"
            v-model="userInput.rating"
          >
            <option disabled :value="0">Select One</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          <label for="category">Category:</label>
          <select
            id="category"
            class="text-abyss-purple-1 rounded-xl px-2"
            v-model="userInput.category"
          >
            <option disabled value="">Select One</option>
            <option>Plan To Read</option>
            <option>Reading</option>
            <option>Completed</option>
            <option>Dropped</option>
          </select>
        </div>

        <button @click="addMangaEntry" class="bg-abyss-purple-2 py-1 px-2">
          Add Entry
        </button>
      </div>
    </div>
  </template>
</template>
