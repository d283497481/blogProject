// 计算分页值
export function computedPagingValue(count: number, pageSize: number, pageNum: number) {
  const maxPageNum = Math.ceil(count / pageSize);
  if (pageNum > maxPageNum) pageNum = maxPageNum;
  if (pageNum < 1) pageNum = 1;
  const offset = (pageNum - 1) * pageSize;
  return [pageNum, offset];
}
