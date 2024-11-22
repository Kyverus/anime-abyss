<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import LoadingPage from "../status/LoadingPage.vue";
import { axiosPrivate } from "../../api/axios";
import { AxiosError, isAxiosError } from "axios";

const route = useRoute();
const router = useRouter();

const anime = ref<any>(null);
const userInput = reactive({
  rating: 0,
  category: "",
});

fetch(`https://api.jikan.moe/v4/anime/${route.params.animeId}`)
  .then((res) => res.json())
  .then((res) => {
    anime.value = res.data;
  });

async function addAnimeEntry() {
  const genres = anime.value.genres.map((genre: any) => genre.name).join(",");

  console.log(genres);

  try {
    const response = await axiosPrivate.post(
      "/api/animeentries",
      JSON.stringify({
        animeId: anime.value.mal_id,
        title: anime.value.title,
        imageURL: anime.value.images.jpg.image_url,
        genres: genres,
        rating: userInput.rating,
        category: userInput.category,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
    }
    console.log(response);

    router.push("/anime");
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      console.log(error);
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
}
</script>

<template>
  <LoadingPage v-if="anime == undefined" />
  <template v-else>
    <div class="container mx-auto mt-10 flex gap-5 bg-abyss-blue-3 p-5">
      <img
        :src="anime.images.jpg.image_url"
        class="min-w-[235px] h-[335px]"
        alt=""
      />
      <div class="space-y-2">
        <div class="font-bold text-3xl text-abyss-purple-1">
          {{ anime.title }}
        </div>
        <ul>
          <li v-for="genre in anime.genres" class="list-disc list-inside">
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
            <option>Plan To Watch</option>
            <option>Watching</option>
            <option>Completed</option>
            <option>Dropped</option>
          </select>
        </div>

        <button @click="addAnimeEntry" class="bg-abyss-purple-2 py-1 px-2">
          Add Entry
        </button>
      </div>
    </div>
  </template>
</template>
