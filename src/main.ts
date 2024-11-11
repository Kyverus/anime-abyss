import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/auth/LoginPage.vue";
import RegisterPage from "./pages/auth/RegisterPage.vue";
import AnimePage from "./pages/AnimePage.vue";
import MangaPage from "./pages/MangaPage.vue";
import ListEntries from "./pages/protected/ListEntries.vue";

const routes = [
  { path: "/", component: AnimePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/anime", component: AnimePage },
  { path: "/manga", component: MangaPage },
  { path: "/listentries", component: ListEntries },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount("#app");
