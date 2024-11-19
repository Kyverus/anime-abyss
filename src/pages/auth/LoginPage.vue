<script setup lang="ts">
import UserInputValidator from "../UserInputValidator.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const formDetails = reactive({
  email: "",
  password: "",
});

const hasErrors = ref<Boolean>(false);

async function handleSumbit(e: any) {
  e.preventDefault();
  if (hasErrors.value) return;
  const res = await authStore.loginUser(formDetails);

  if (res) {
    router.push("/listentries");
  }
}

function setErrors(value: Boolean) {
  hasErrors.value = value;
}
</script>

<template>
  <div class="flex flex-col items-center mt-20">
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
