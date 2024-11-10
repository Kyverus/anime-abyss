<script lang="ts" setup>
import { ref, provide } from "vue";

const token = ref<String>("");

function setAuth(value: String) {
  token.value = value;
  console.log("updated");
}

provide("setAuth", setAuth);
provide("token", token);
</script>

<template>
  <slot></slot>
</template>
