<script lang="ts" setup>
import { ref, inject } from "vue";

const name = ref<String>("");

const val = inject("token", "none yet");

const handleButton = inject("setAuth", (value: String) => {
  console.log(`Passed ${value}: But function not found`);
});

function submit() {
  handleButton(name.value);
}
</script>

<template>
  <div>TESt</div>
  <div>Value: {{ val }}</div>
  <input type="text" v-model="name" class="text-black" />
  <button @click="submit" class="bg-red-500">Click</button>
</template>
