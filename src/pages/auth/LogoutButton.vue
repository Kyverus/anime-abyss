<script lang="ts" setup>
import { axiosPrivate } from "../../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

async function logoutUser() {
  const response = await axiosPrivate.get("/api/users/logout");
  axiosPrivate.defaults.headers.common["Authorization"] = "";
  console.log("logged out", response);
  await router.push("/login");
}
</script>

<template>
  <button @click="logoutUser">LOGOUT</button>
</template>
