<script setup lang="ts">
const emits = defineEmits(["searchQuery"]);

function handleSearch() {
  const search = document.getElementById("search_bar") as HTMLInputElement;

  emits("searchQuery", search.value);
}
</script>

<template>
  <div class="container mx-auto px-5 xs:flex">
    <input id="search_bar" type="text" class="text-black w-full outline-none" />
    <button
      class="bg-abyss-purple-2 px-3 w-full xs:w-auto"
      @click="handleSearch"
    >
      SEARCH
    </button>
  </div>
</template>
