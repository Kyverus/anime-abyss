<script setup lang="ts">
import { reactive, ref, inject } from "vue";
import UserInputValidator from "./UserInputValidator.vue";

const setAuth = inject("setAuth", (value: String) => {
  console.log(`Passed ${value}: But function not found`);
});
const token = inject("token", "");

const formDetails = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const hasErrors = ref<Boolean>(false);

function handleSumbit(e: any) {
  e.preventDefault();
  if (hasErrors.value) return;
  fetch(`https://anime-abyss-backend.vercel.app/api/users/register`, {
    method: "POST",
    body: JSON.stringify({
      username: formDetails.username,
      email: formDetails.email,
      password: formDetails.password,
      confirmPassword: formDetails.confirmPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      setAuth(res);
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

function setErrors(value: Boolean) {
  hasErrors.value = value;
}
</script>

<template>
  <div class="min-h-dvh flex flex-col items-center mt-20">
    <form
      action=""
      class="flex flex-col w-[500px] bg-blue-400 mx-auto p-4 space-y-2 rounded-md text-black"
    >
      <div class="text-center">REGISTER TO THE ABYSS {{ token }}</div>
      <br />
      <label for="username">USERNAME</label>
      <input v-model="formDetails.username" id="username" type="text" />
      <label for="email">EMAIL</label>
      <input required v-model="formDetails.email" id="email" type="text" />
      <label for="password">PASSWORD</label>
      <input v-model="formDetails.password" id="password" type="password" />
      <label for="confirmPassword">CONFIRM PASSWORD</label>
      <input
        v-model="formDetails.confirmPassword"
        id="confirmPassword"
        type="password"
      />
      <br />
      <button
        class="text-white"
        :class="hasErrors ? `bg-red-900` : `bg-blue-900`"
        @click="handleSumbit"
        :disabled="hasErrors == true"
      >
        REGISTER
      </button>

      <UserInputValidator :user="formDetails" @hasErrors="setErrors" />
    </form>
  </div>
</template>
