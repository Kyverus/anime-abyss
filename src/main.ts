import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./pages/users/LoginPage.vue";
import RegisterPage from "./pages/users/RegisterPage.vue";
import AnimePage from "./pages/AnimePage.vue";
import MangaPage from "./pages/MangaPage.vue";
import TestPage from "./pages/TestPage.vue";

const routes = [
  { path: "/", component: AnimePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/anime", component: AnimePage },
  { path: "/manga", component: MangaPage },
  { path: "/test", component: TestPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount("#app");
