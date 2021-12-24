import { App } from 'vue';
import { formatTime, formatUtcString } from '@/utils/date-format';

export default {
  install(app: App) {
    app.config.globalProperties.$filters = {
      formatTime(value: string) {
        if (value.includes('T')) return formatUtcString(value);
        else formatTime(value);
      }
    };
  }
};
