<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { AxiosError, isAxiosError } from "axios";
import { axiosPrivate } from "../../api/axios";

interface ListEntry {
  animeId: String;
  userId: String;
  rating: Number;
  category: String;
}

const listEntries = ref<ListEntry[]>([]);

onMounted(() => {
  async function getUsers() {
    try {
      const response = await axiosPrivate.get("/api/listentries", {
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
  <div>THIS IS IT!!</div>
  <template v-for="entry of listEntries">
    <div v-if="listEntries.length > 0">
      <div>{{ entry.animeId }}</div>
      <div>{{ entry.rating }}</div>
    </div>
  </template>
</template>
