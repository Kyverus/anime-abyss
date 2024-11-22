<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { AxiosError, isAxiosError } from "axios";
import { axiosPrivate } from "../../api/axios";

interface AnimeEntry {
  animeId: string;
  userId: string;
  title: string;
  imageURL: string;
  genres: string;
  rating: number;
  category: string;
}

const listEntries = ref<AnimeEntry[]>([]);

onMounted(() => {
  async function getUsers() {
    try {
      const response = await axiosPrivate.get("/api/animeentries", {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status == 200) {
        console.log(response.data);
        listEntries.value = response.data;
      }
    } catch (error: unknown | AxiosError) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }

  getUsers();
});
</script>

<template>
  <div class="container mx-auto mt-10 bg-abyss-blue-3">
    <table v-if="listEntries.length > 0" class="w-full">
      <tr class="text-center bg-abyss-purple-2">
        <th class="w-20"></th>
        <th>Title</th>
        <th>Category</th>
        <th>Rating</th>
        <th>Genres</th>
      </tr>
      <tr v-for="entry of listEntries">
        <td
          class="flex items-center justify-center p-2 even:bg-abyss-purple-3 odd:bg-abyss-blue-3"
        >
          <div
            class="size-[76px] rounded-full"
            :style="`background-image: url(${entry.imageURL}); background-position:50%; background-size: 100%;`"
          ></div>
        </td>
        <td class="text-center even:bg-abyss-purple-3 odd:bg-abyss-blue-3">
          {{ entry.title }}
        </td>
        <td class="text-center even:bg-abyss-purple-3 odd:bg-abyss-blue-3">
          {{ entry.category }}
        </td>
        <td class="text-center even:bg-abyss-purple-3 odd:bg-abyss-blue-3">
          {{ entry.rating }}
        </td>
        <td class="text-center even:bg-abyss-purple-3 odd:bg-abyss-blue-3">
          {{ entry.genres }}
        </td>
      </tr>
    </table>
  </div>
</template>
