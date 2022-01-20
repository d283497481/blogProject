import request from '@/utils/request';

/** 登录接口 */
export function loginApi(params: any): any {
  return request.post(`/user/login`, { ...params });
}

/** 获取用户信息*/
export function userInfoApi(): any {
  return request.get(`/user/info`);
}

/** 上传图片接口 */
export function uploadImgApi(params: any): any {
  return request.post(`/file/add`, { ...params }, { contentType: 'form-data' });
}
/** 删除图片接口 */
export function deleteImgApi(params: any): any {
  return request.post(`/file/delete`, { ...params });
}
