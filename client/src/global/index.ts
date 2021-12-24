import { App } from 'vue';
import elementPlus from './element-plus';
import svgIcon from './svg-icon';
import registerProperties from './register-properties';

export default {
  install(app: App) {
    app.use(elementPlus);
    app.use(svgIcon);
    app.use(registerProperties);
  }
};
