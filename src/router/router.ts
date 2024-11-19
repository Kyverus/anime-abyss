import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";
import AnimePage from "../pages/AnimePage.vue";
import MangaPage from "../pages/MangaPage.vue";
import ListEntries from "../pages/protected/ListEntries.vue";
import AnimeInfoPage from "../pages/AnimeInfoPage.vue";
import MangaInfoPage from "../pages/MangaInfoPage.vue";

const routes = [
  {
    path: "/",
    component: AnimePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/anime",
    component: AnimePage,
  },
  {
    path: "/anime/:animeId",
    name: "animeInfo",
    component: AnimeInfoPage,
  },
  {
    path: "/manga/:mangaId",
    name: "mangaInfo",
    component: MangaInfoPage,
  },
  {
    path: "/manga",
    component: MangaPage,
  },
  {
    path: "/listentries",
    component: ListEntries,
    meta: {
      needsAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const authStore = useAuthStore();

router.beforeEach(async (to) => {
  if (!authStore.refresh.loadedOnce) {
    const res = await authStore.refreshTokenOnStart();
    authStore.refresh.loadedOnce = true;
    if (!res) return { name: "Login" };
  }
  if (to.meta.needsAuth) {
    if (!authStore.auth.isLoggedIn) {
      return { name: "Login" };
    }
  }
  if (
    authStore.auth.isLoggedIn &&
    (to.name == "Login" || to.name == "Register")
  ) {
    return false;
  }
});

export default router;
