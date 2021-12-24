import type { App } from 'vue';
import 'element-plus/dist/index.css';
import {
  ElAvatar,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDialog,
  ElDropdown,
  ElForm,
  ElInput,
  ElLink,
  ElMenu,
  ElPagination,
  ElResult,
  ElRow,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTabs,
  ElTag,
  ElTree,
  ElUpload
} from 'element-plus';

export default {
  install(app: App): void {
    app.use(ElButton);
    app.use(ElForm);
    app.use(ElInput);
    app.use(ElContainer);
    app.use(ElBreadcrumb);
    app.use(ElMenu);
    app.use(ElDropdown);
    app.use(ElAvatar);
    app.use(ElResult);
    app.use(ElRow);
    app.use(ElCol);
    app.use(ElTable);
    app.use(ElDatePicker);
    app.use(ElPagination);
    app.use(ElSelect);
    app.use(ElDialog);
    app.use(ElTree);
    app.use(ElSwitch);
    app.use(ElTag);
    app.use(ElUpload);
    app.use(ElTabs);
    app.use(ElCard);
    app.use(ElLink);
    app.use(ElDescriptions);
  }
};
