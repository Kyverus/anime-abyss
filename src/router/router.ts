import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import LoginPage from "../pages/auth/LoginPage.vue";
import RegisterPage from "../pages/auth/RegisterPage.vue";
import AnimePage from "../pages/AnimePage.vue";
import MangaPage from "../pages/MangaPage.vue";
import AnimeInfoPage from "../pages/AnimeInfoPage.vue";
import MangaInfoPage from "../pages/MangaInfoPage.vue";
import AddAnimeEntry from "../pages/protected/AddAnimeEntry.vue";
import EntriesPage from "../pages/protected/EntriesPage.vue";
import AddMangaEntry from "../pages/protected/AddMangaEntry.vue";

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
    path: "/entries",
    component: EntriesPage,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/add-anime-entry/:animeId",
    name: "addAnime",
    component: AddAnimeEntry,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/add-manga-entry/:mangaId",
    name: "addManga",
    component: AddMangaEntry,
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

router.beforeEach(async (to, from) => {
  if (to == from) {
    return;
  }

  if (!authStore.refresh.loadedOnce) {
    const res = await authStore.refreshTokenOnStart();
    authStore.refresh.loadedOnce = true;
    if (!res.success && to.meta.needsAuth) {
      return "/anime";
    } else {
      console.log(res.errors);
    }
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
    return "/";
  }
});

export default router;
