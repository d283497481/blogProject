import type { App } from 'vue';
import elementPlus from './elementPlus';
import VueParticles from 'vue-particles';
import RegisterProperties from './register-properties';
import Editor from './editor';

export default {
  install(app: App): void {
    app.use(elementPlus);
    app.use(VueParticles);
    app.use(RegisterProperties);
    app.use(Editor);
  }
};
