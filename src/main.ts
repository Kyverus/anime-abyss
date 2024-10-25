import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import AnimePage from "./pages/AnimePage.vue";
import MangaPage from "./pages/MangaPage.vue";

const routes = [
  { path: "/", component: AnimePage },
  { path: "/anime", component: AnimePage },
  { path: "/manga", component: MangaPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router).mount("#app");
