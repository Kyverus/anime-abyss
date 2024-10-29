<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ItemList from "../components/ItemList.vue";
import Pagination from "../components/Pagination.vue";

let topAnime = ref([]);
let pagination = ref({
  has_next_page: false,
  current_page: 1,
  last_visible_page: 1,
});
let page = ref(1040);

watchEffect(() => {
  fetch(
    `https://api.jikan.moe/v4/anime?page=${page.value}&order_by=popularity&sfw=true`
  )
    .then((res) => res.json())
    .then((res) => {
      topAnime.value = res.data;
      pagination.value = res.pagination;
    });
});

function pageHandler(value: number) {
  page.value = value;
}
</script>

<template>
  <ItemList :list="topAnime" class="mt-40" />

  <div v-if="topAnime.length > 0">
    <Pagination
      :page="page"
      :maxPage="pagination.last_visible_page"
      :min-page="1"
      :page-view-count="3"
      @pageHandle="pageHandler"
    />
  </div>
</template>
