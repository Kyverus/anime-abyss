<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ItemList from "../components/ItemList.vue";
import Pagination from "../components/Pagination.vue";
import { useRouter } from "vue-router";

const router = useRouter();

let topManga = ref<any[]>([]);
let pagination = ref({
  has_next_page: false,
  current_page: 1,
  last_visible_page: 1,
});
let page = ref(1);

watchEffect(() => {
  fetch(
    `https://api.jikan.moe/v4/manga?page=${page.value}&order_by=popularity&sfw=true`
  )
    .then((res) => res.json())
    .then((res) => {
      topManga.value = res.data;
      pagination.value = res.pagination;
    });
});

function goToMangaInfo(id: any) {
  router.push({ name: "mangaInfo", params: { mangaId: id } });
}

function pageHandler(value: number) {
  page.value = value;
}
</script>

<template>
  <ItemList :list="topManga" class="mt-20" @info-click="goToMangaInfo" />

  <div v-if="topManga.length > 0">
    <Pagination
      :page="page"
      :maxPage="pagination.last_visible_page"
      :min-page="1"
      :page-view-count="3"
      @pageHandle="pageHandler"
    />
  </div>
</template>
