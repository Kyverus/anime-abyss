<script setup lang="ts">
import { reactive, ref } from "vue";
import UserInputValidator from "../UserInputValidator.vue";
import { useRouter } from "vue-router";
import axios, { axiosPrivate } from "../../api/axios";
import { AxiosError, isAxiosError } from "axios";

const router = useRouter();
const formDetails = reactive({
  email: "",
  password: "",
});

const hasErrors = ref<Boolean>(false);

async function loginUser() {
  try {
    const response = await axios.post(
      "/api/users/login",
      JSON.stringify({
        email: formDetails.email,
        password: formDetails.password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(response.data);
    axiosPrivate.defaults.headers.common[
      "Authorization"
    ] = `BEARER ${response.data.accessToken}`;
    router.push("/listentries");
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
}

function handleSumbit(e: any) {
  e.preventDefault();
  if (hasErrors.value) return;
  loginUser();
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
      <div class="text-center">LOGIN TO THE ABYSS</div>
      <br />
      <label for="email">EMAIL</label>
      <input required v-model="formDetails.email" id="email" type="text" />
      <label for="password">PASSWORD</label>
      <input v-model="formDetails.password" id="password" type="password" />
      <br />
      <button
        class="text-white"
        :class="hasErrors ? `bg-red-900` : `bg-blue-900`"
        @click="handleSumbit"
        :disabled="hasErrors == true"
      >
        LOGIN
      </button>

      <UserInputValidator :user="formDetails" @hasErrors="setErrors" />
    </form>
  </div>
</template>
