<script setup lang="ts">
import { computed, watchEffect } from "vue";
const emits = defineEmits(["hasErrors"]);
const props = defineProps<{
  user: {
    username?: String;
    email?: String;
    password?: String;
    confirmPassword?: String;
  };
}>();

const errors = computed(() => validateUser(props.user));

watchEffect(() => {
  emits("hasErrors", errors.value.length > 0);
});

function validateUser(user: {
  username?: String;
  email?: String;
  password?: String;
  confirmPassword?: String;
}): any[] {
  const newErrors = [];
  if (
    user.username == "" ||
    user.email == "" ||
    user.password == "" ||
    user.confirmPassword == ""
  ) {
    newErrors.push({ message: "Inputs should not be empty" });
  }
  // if () {
  //   newErrors.push({ message: "Email should not be empty" });
  // }
  // if () {
  //   newErrors.push({ message: "Password should not be empty" });
  // }
  // if () {
  //   newErrors.push({ message: "Pasword Confirmation should not be empty" });
  // }

  return newErrors;
}
</script>

<template>
  <ul>
    <li v-for="error in errors" class="list-inside list-disc">
      <span class="text-sm">{{ error.message }}</span>
    </li>
  </ul>
</template>
