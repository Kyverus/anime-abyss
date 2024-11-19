<script setup lang="ts">
interface Item {
  mal_id: String;
  title: string;
  images: any;
}
defineEmits(["infoClick"]);
defineProps<{ list: Item[] }>();
</script>

<template>
  <div class="container flex justify-center mx-auto">
    <div
      class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
    >
      <div v-for="item of list" class="w-[235px] bg-abyss-blue-3 inline-block">
        <div class="relative group" @click="$emit('infoClick', item.mal_id)">
          <div
            class="group-hover:bg-abyss-blue-3/50 brightness-200 absolute h-full w-full"
          ></div>
          <img
            :src="item.images.jpg.image_url"
            alt=""
            class="w-[235px] h-[335px]"
          />
        </div>

        <div class="w-full px-2 truncate">{{ item.title }}</div>
        <button class="text-center w-full bg-abyss-blue-2">Add To List</button>
      </div>
    </div>
  </div>
</template>
