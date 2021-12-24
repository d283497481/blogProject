import { createApp, App } from 'vue';
import RootApp from '@/App.vue';
import router from '@/router';
import store from '@/store';
import global from '@/global';
import 'normalize.css';
import '@/styles/index.less';

import { setupStore } from '@/store';

const app: App = createApp(RootApp);

setupStore();
app.use(store);
app.use(router);
app.use(global);
app.mount('#app');
