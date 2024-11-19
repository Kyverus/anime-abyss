import { createApp } from "vue";
import pinia from "./stores/store.ts";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.ts";
import { OhVueIcon } from "oh-vue-icons";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("v-icon", OhVueIcon);
app.mount("#app");
