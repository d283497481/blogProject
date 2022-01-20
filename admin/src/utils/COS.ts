import * as API from '../common/api';

async function cosUpload(props: any, fileName?: string) {
  const { file, onSuccess, onError } = props;
  API.uploadImgApi({ file, fileName })
    .then((res: any) => {
      onSuccess({ data: res.data.fileName }, file);
      return res.data.fileName;
    })
    .catch((err: any) => {
      onError(err);
      return '';
    });
}

/** 删除文件
 * @param
 * key -- 存储对象的唯一key值，即完整路径除出域名、端口的路径
 * filePath  -- 存储对象的完整路径，方法内自己处理获取key
 */
function cosDelete(params: any, onSuccess?: any, onError?: any) {
  API.deleteImgApi(params)
    .then((res: any) => {
      onSuccess('删除成功');
      return res.data.fileName;
    })
    .catch((err: any) => {
      onError(err);
      return '';
    });
}

export default {
  cosUpload,
  cosDelete,
};
