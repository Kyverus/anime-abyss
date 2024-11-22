<script setup lang="ts">
import { reactive, ref } from "vue";
import UserInputValidator from "../UserInputValidator.vue";
import axios from "../../api/axios.ts";
import { AxiosError, isAxiosError } from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const formDetails = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const hasErrors = ref<Boolean>(false);

async function registerUser() {
  try {
    const response = await axios.post(
      "/api/users/register",
      JSON.stringify({
        username: formDetails.username,
        email: formDetails.email,
        password: formDetails.password,
        confirmPassword: formDetails.confirmPassword,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log(response.data);

    router.push("/login");
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      console.log(error);
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
}

function handleSumbit(e: any) {
  e.preventDefault();

  if (hasErrors.value) return;
  registerUser();
}

function setErrors(value: Boolean) {
  hasErrors.value = value;
}
</script>

<template>
  <div class="flex flex-col items-center mt-20 px-10">
    <form
      action=""
      class="flex flex-col container md:w-[500px] bg-abyss-blue-3 mx-auto p-4 space-y-2 rounded-md text-white"
    >
      <div class="text-center font-bold">REGISTER TO THE ABYSS</div>
      <br />
      <label for="username">USERNAME</label>
      <input
        class="text-black"
        v-model="formDetails.username"
        id="username"
        type="text"
      />
      <label for="email">EMAIL</label>
      <input
        class="text-black"
        required
        v-model="formDetails.email"
        id="email"
        type="text"
      />
      <label for="password">PASSWORD</label>
      <input
        class="text-black"
        v-model="formDetails.password"
        id="password"
        type="password"
      />
      <label for="confirmPassword">CONFIRM PASSWORD</label>
      <input
        class="text-black"
        v-model="formDetails.confirmPassword"
        id="confirmPassword"
        type="password"
      />
      <br />
      <button
        class="text-white"
        :class="hasErrors ? `bg-gray-700` : `bg-abyss-purple-2`"
        @click="handleSumbit"
        :disabled="hasErrors == true"
      >
        REGISTER
      </button>

      <UserInputValidator :user="formDetails" @hasErrors="setErrors" />
    </form>
  </div>
</template>
