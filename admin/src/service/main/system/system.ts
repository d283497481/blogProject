import { networkRequest } from '@/service';
import { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return networkRequest.post<IDataType>({
    url,
    data: queryInfo
  });
}

export function deletePageData(url: string) {
  return networkRequest.delete<IDataType>({
    url
  });
}

export function createPageData(url: string, newData: any) {
  return networkRequest.post({
    url,
    data: newData
  });
}

export function editPageData(url: string, editData: any) {
  return networkRequest.patch({
    url,
    data: editData
  });
}

export function updateUsertatus(userId: number, status: number) {
  return networkRequest.patch({
    url: `/user/${userId}/status`,
    data: { status }
  });
}

export function updateUserPassword(userId: number, data: any) {
  return networkRequest.patch({
    url: `/user/${userId}/updatePass`,
    data
  });
}

export function uploadUserAvatar(userId: number, formData: FormData) {
  return networkRequest.post<IDataType>({
    url: `/upload/avatar`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
