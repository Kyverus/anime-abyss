<script setup lang="ts">
const emits = defineEmits(["searchQuery"]);

function handleSearch() {
  const search = document.getElementById("search_bar") as HTMLInputElement;

  emits("searchQuery", search.value);
}
</script>

<template>
  <div class="container mx-auto px-5 xs:flex">
    <input
      id="search_bar"
      type="search"
      class="w-full outline-none border-2 border-abyss-purple-3 xs:rounded-l-xl caret-abyss-blue-3 font-semibold text-[whitesmoke] bg-transparent px-5"
    />
    <button
      class="bg-abyss-purple-3 hover:bg-abyss-blue-2 active:bg-abyss-purple-2 px-3 w-full xs:w-auto"
      @click="handleSearch"
    >
      SEARCH
    </button>
  </div>
</template>
