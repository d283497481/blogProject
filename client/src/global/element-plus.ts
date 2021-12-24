import { App } from 'vue';
import 'element-plus/dist/index.css';
import {
  ElAvatar,
  ElBacktop,
  ElButton,
  ElCard,
  ElCol,
  ElContainer,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElForm,
  ElInput,
  ElMenu,
  ElPagination,
  ElPopover,
  ElResult,
  ElRow,
  ElTag,
  ElTimeline
} from 'element-plus';

export default {
  install(app: App) {
    app.use(ElContainer);
    app.use(ElRow);
    app.use(ElCol);
    app.use(ElMenu);
    app.use(ElCard);
    app.use(ElTag);
    app.use(ElDivider);
    app.use(ElPagination);
    app.use(ElTimeline);
    app.use(ElBacktop);
    app.use(ElInput);
    app.use(ElButton);
    app.use(ElPopover);
    app.use(ElDropdown);
    app.use(ElAvatar);
    app.use(ElDialog);
    app.use(ElForm);
    app.use(ElResult);
  }
};
