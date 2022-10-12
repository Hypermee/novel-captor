import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import { piniaPersistPlugin } from "./utils/plugin";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersistPlugin);
app.use(pinia).mount('#app');
