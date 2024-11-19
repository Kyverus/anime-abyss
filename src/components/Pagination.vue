<script lang="ts" setup>
import { computed } from "vue";
import { addIcons } from "oh-vue-icons";
import { HiChevronLeft, HiChevronRight } from "oh-vue-icons/icons";

addIcons(HiChevronLeft, HiChevronRight);

defineEmits(["pageHandle"]);
const props = withDefaults(
  defineProps<{
    page: number;
    maxPage: number;
    minPage: number;
    pageViewCount?: number;
  }>(),
  { page: 1, maxPage: 1, minPage: 1, pageViewCount: 0 }
);

const pageViewStart = computed(() => {
  let value = props.page - Math.floor(props.pageViewCount / 2);
  if (props.page - Math.floor(props.pageViewCount / 2) <= props.minPage) {
    value = props.minPage;
  }

  if (props.page + Math.floor(props.pageViewCount / 2) >= props.maxPage) {
    value = props.maxPage - props.pageViewCount + 1;
  }
  return value;
});
</script>

<template>
  <div class="flex items-center justify-center gap-5 py-10">
    <div class="w-20 bg-abyss-purple-3 ml-5">
      <button
        v-if="page > minPage"
        @click="$emit('pageHandle', page - 1)"
        class="w-full"
      >
        <v-icon name="hi-chevron-left" />
      </button>
    </div>
    <div class="w-[500px]">
      <div
        class="flex flex-row flex-wrap items-center justify-center gap-2 grow"
      >
        <button
          class="bg-abyss-second basis-1 grow font-bold bg-abyss-blue-2"
          v-for="(_, i) in pageViewCount"
          @click="$emit('pageHandle', pageViewStart + i)"
          :class="{ 'bg-abyss-purple-3': pageViewStart + i == page }"
        >
          {{ pageViewStart + i }}
        </button>
      </div>
    </div>

    <div class="w-20 bg-abyss-purple-3 mr-5">
      <button
        v-if="page < maxPage"
        @click="$emit('pageHandle', page + 1)"
        class="w-full"
      >
        <v-icon name="hi-chevron-right" />
      </button>
    </div>
  </div>
</template>
