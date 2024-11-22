<script setup lang="ts">
import { computed, watchEffect } from "vue";
const emits = defineEmits(["hasErrors"]);
const props = defineProps<{
  user: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}>();

const errors = computed(() => validateUser(props.user));

watchEffect(() => {
  emits("hasErrors", errors.value.length > 0);
});

function validateUser(user: {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
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

  if (user.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.push({ message: "Provide a valid email address" });
    }
  }

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
