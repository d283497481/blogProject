export function notEmptyCheck(data: any) {
  if (data !== null && data !== undefined && data !== '') return true;
  else false;
}

interface IArray {
  [key: string]: any;
}
// 将具有父子关系的数组数据转换为树形结构
export function arrayToTree(target: IArray[], parentKey: string, parentVal: any) {
  const result: IArray[] = [];
  const getChildren = (data: IArray[], result: IArray[], pid: any) => {
    data.forEach((item) => {
      if (item[parentKey] === pid) {
        result.push(item);
        item.children = [];
        getChildren(data, item.children, item.id);
      }
    });
  };
  getChildren(target, result, parentVal);
  return result;
}
