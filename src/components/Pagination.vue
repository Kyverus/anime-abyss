<script lang="ts" setup>
import { computed } from "vue";
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
  <div class="bg-blue-200">{{ page }} {{ maxPage }} {{ minPage }}</div>
  <div class="flex items-center justify-center gap-5">
    <div class="w-20 bg-green-500 text-ct-white">
      <button
        v-if="page > minPage"
        @click="$emit('pageHandle', page - 1)"
        class="w-full"
      >
        PREV
      </button>
    </div>
    <div class="w-[500px]">
      <div
        class="flex flex-row flex-wrap items-center justify-center gap-2 grow"
      >
        <button
          class="bg-slate-500 basis-1 grow"
          v-for="(_, i) in pageViewCount"
          @click="$emit('pageHandle', pageViewStart + i)"
          :class="{ 'bg-blue-500': pageViewStart + i == page }"
        >
          {{ pageViewStart + i }}
        </button>
      </div>
    </div>

    <div class="w-20 bg-green-500 text-ct-white">
      <button
        v-if="page < maxPage"
        @click="$emit('pageHandle', page + 1)"
        class="w-full"
      >
        NEXT
      </button>
    </div>
  </div>
</template>
