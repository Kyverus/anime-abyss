<script setup lang="ts">
import UserInputValidator from "../UserInputValidator.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

//This is for showcasing
const testUser = {
  email: "testinguser@gmail.com",
  password: "TestingUser12345",
};

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const formDetails = reactive({
  email: "",
  password: "",
});

const hasErrors = ref<Boolean>(false);

async function handleSumbit(e: any) {
  e.preventDefault();
  loading.value = true;
  if (hasErrors.value) return;
  const res = await authStore.loginUser(formDetails);

  if (res.success) {
    router.push("/entries");
  } else {
    console.log(res.errors);
  }

  formDetails.email = "";
  formDetails.password = "";
  loading.value = false;
}

function setErrors(value: Boolean) {
  hasErrors.value = value;
}

function inputTestCredentials() {
  formDetails.email = testUser.email;
  formDetails.password = testUser.password;
}
</script>

<template>
  <div class="flex flex-col items-center mt-20 px-10">
    <form
      action=""
      class="flex flex-col container md:w-[500px] bg-abyss-blue-3 mx-auto p-4 space-y-2 rounded-md text-white"
    >
      <div class="text-center font-bold">LOGIN TO THE ABYSS</div>
      <br />
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
        autocomplete="off"
      />
      <br />
      <button
        class="text-white"
        :class="hasErrors || loading ? `bg-gray-700` : `bg-abyss-purple-2`"
        @click="handleSumbit"
        :disabled="hasErrors == true || loading == true"
      >
        LOGIN
      </button>

      <UserInputValidator :user="formDetails" @hasErrors="setErrors" />
    </form>
    <div class="bg-abyss-purple-2 flex-col container md:w-[500px] mt-5 p-5">
      <div>
        <div class="font-bold">Testing Account:</div>
        <h2>Email: {{ testUser.email }}</h2>
        <h2>Password: {{ testUser.password }}</h2>
      </div>
      <button
        class="w-full text-center bg-abyss-blue-3 mt-5"
        @click="inputTestCredentials"
      >
        Try Test Account
      </button>
    </div>
  </div>
</template>
