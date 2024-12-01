<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ItemList from "../components/ItemList.vue";
import Pagination from "../components/Pagination.vue";
import { useRouter } from "vue-router";
import SearchBar from "../components/SearchBar.vue";

const router = useRouter();

let topAnime = ref<any[]>([]);
let pagination = ref({
  has_next_page: false,
  current_page: 1,
  last_visible_page: 1,
});
let page = ref(1);
let query = ref("");

watchEffect(() => {
  if (query.value == "") {
    fetch(
      `https://api.jikan.moe/v4/anime?page=${page.value}&order_by=popularity&sfw=true`
    )
      .then((res) => res.json())
      .then((res) => {
        topAnime.value = res.data;
        pagination.value = res.pagination;
      })
      .then(() => console.log("fetch list"));
  } else {
    fetch(
      `https://api.jikan.moe/v4/anime?page=${page.value}&order_by=popularity&sfw=true&q=${query.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        topAnime.value = res.data;
        pagination.value = res.pagination;
      })
      .then(() => console.log("query added"));
  }
});

function goToAnimeInfo(id: any) {
  router.push({ name: "animeInfo", params: { animeId: id } });
}

function pageHandler(value: number) {
  page.value = value;
}

function changeQuery(value: string) {
  query.value = value;
}
</script>

<template>
  <SearchBar @searchQuery="changeQuery" class="mt-5" />
  <ItemList :list="topAnime" class="mt-20" @infoClick="goToAnimeInfo" />

  <div v-if="topAnime.length > 0">
    <Pagination
      :page="page"
      :maxPage="pagination.last_visible_page"
      :min-page="1"
      :page-view-count="pagination.last_visible_page > 2 ? 3 : 1"
      @pageHandle="pageHandler"
    />
  </div>
</template>
