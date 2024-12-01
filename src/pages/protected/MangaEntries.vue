<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import LoadingFlex from "../status/LoadingFlex.vue";
import { useMangaEntryStore } from "../../stores/mangaentries";

const mangaEntryStore = useMangaEntryStore();
const listEntries = computed(() => mangaEntryStore.listEntries);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;

  if (listEntries.value.length == 0) {
    console.log("load");
    const res = await mangaEntryStore.fetchMangaEntries();

    if (res.success) {
      console.log("success");
    } else {
      console.log(res.errors);
    }
  }
  loading.value = false;
});
</script>

<template>
  <div class="flex items-center justify-center py-5" v-if="loading">
    <LoadingFlex />
  </div>
  <div class="container mx-auto mt-10 bg-abyss-blue-3">
    <table v-if="listEntries.length > 0" class="w-full">
      <tbody>
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
      </tbody>
    </table>
  </div>
</template>
