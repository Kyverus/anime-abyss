<script setup lang="ts">
interface Item {
  title: string;
  images: any;
}

defineProps<{ list: Item[] }>();
</script>

<template>
  <div class="container mx-auto flex flex-wrap justify-center">
    <div v-for="item of list" class="bg-red-200 border-blue-300 w-[235px]">
      <img
        :src="item.images.jpg.image_url"
        alt=""
        class="w-[235px] h-[335px]"
      />
      <div class="flex">
        <button class="w-[50%] bg-slate-400 border-x-2">Info</button>
        <button class="w-[50%] bg-slate-400">Add To List</button>
      </div>
      <div class="w-full px-2 truncate">{{ item.title }}</div>
    </div>
  </div>
</template>
