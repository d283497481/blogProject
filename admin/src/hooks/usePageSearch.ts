import { ref } from 'vue';
import PageContent from '@/components/page-content';

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleResetClick = () => {
    pageContentRef.value?.getPageData({}, true);
  };

  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo, true);
  };

  return { pageContentRef, handleResetClick, handleQueryClick };
}
