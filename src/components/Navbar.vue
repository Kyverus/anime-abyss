<script setup lang="ts">
import { IoClose } from "oh-vue-icons/icons";
import { OiThreeBars } from "oh-vue-icons/icons";
import { ref } from "vue";
import LogoutButton from "../pages/auth/LogoutButton.vue";
import { useAuthStore } from "../stores/auth";
import { addIcons } from "oh-vue-icons";

addIcons(IoClose, OiThreeBars);

const authStore = useAuthStore();

const collapse = ref(false);

function toggleCollapse() {
  collapse.value = !collapse.value;
}
</script>

<template>
  <div class="bg-black text-white">
    <div class="container mx-auto">
      <div class="xs:flex justify-between">
        <div class="font-bold p-5 flex items-center gap-2">
          <div class="md:hidden" @click="toggleCollapse">
            <div v-if="collapse">
              <v-icon name="io-close" class="size-[19.19px]" />
            </div>
            <div v-else>
              <v-icon name="oi-three-bars" class="size-[19.19px]" />
            </div>
          </div>
          <div class="flex items-center justify-center">
            <img
              class="size-10"
              src="/src/assets/anime-abyss-logo-alt-transparent.png"
              alt=""
            />
            <RouterLink to="/"
              ><div class="hover:text-abyss-purple-4">ANIME ABYSS</div>
            </RouterLink>
          </div>
        </div>
        <div class="hidden md:flex justify-center">
          <div class="flex items-center">
            <RouterLink to="/anime"
              ><div class="hover:bg-abyss-purple-2 px-5">ANIME</div></RouterLink
            >
            <RouterLink to="/manga"
              ><div class="hover:bg-abyss-purple-2 px-5">MANGA</div></RouterLink
            >
            <RouterLink to="/entries">
              <div class="hover:bg-abyss-purple-2 px-5">ENTRIES</div>
            </RouterLink>
          </div>
        </div>
        <div class="hidden xs:flex items-center justify-center">
          <template v-if="!authStore.auth.isLoggedIn">
            <RouterLink to="/login"
              ><div class="hover:bg-abyss-purple-2 px-2">LOGIN</div></RouterLink
            >
            <RouterLink to="/register"
              ><div class="hover:bg-abyss-purple-2 px-2">
                REGISTER
              </div></RouterLink
            >
          </template>
          <LogoutButton v-if="authStore.auth.isLoggedIn" />
        </div>
      </div>

      <div
        id="collapse-section"
        class="md:hidden pb-3"
        :class="{ hidden: !collapse }"
      >
        <RouterLink to="/anime"
          ><div class="hover:bg-abyss-purple-2 px-5">ANIME</div></RouterLink
        >
        <RouterLink to="/manga"
          ><div class="hover:bg-abyss-purple-2 px-5">MANGA</div></RouterLink
        >
        <RouterLink to="/entries">
          <div class="hover:bg-abyss-purple-2 px-5">Entries</div>
        </RouterLink>

        <div class="pt-3">
          <template v-if="!authStore.auth.isLoggedIn">
            <RouterLink to="/login"
              ><div class="hover:bg-abyss-purple-2 px-5">LOGIN</div></RouterLink
            >
            <RouterLink to="/register"
              ><div class="hover:bg-abyss-purple-2 px-5">
                REGISTER
              </div></RouterLink
            >
          </template>
          <LogoutButton v-if="authStore.auth.isLoggedIn" />
        </div>
      </div>
    </div>
  </div>
</template>
