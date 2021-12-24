import { networkRequest } from '@/service';
import { IDataType } from './../../types';

export function createPost(title: string, abstract: string, content: string) {
  return networkRequest.post<IDataType>({
    url: '/post',
    data: {
      title,
      abstract,
      content
    }
  });
}

export function updatePost(postId: number, title: string, abstract: string, content: string) {
  return networkRequest.patch<IDataType>({
    url: `/post/${postId}`,
    data: {
      title,
      abstract,
      content
    }
  });
}

export function addPostLabel(postId: number, labels: string[]) {
  return networkRequest.post<IDataType>({
    url: `/post/${postId}/labels`,
    data: {
      labels
    }
  });
}

export function addPostImage(postId: number, formData: FormData) {
  return networkRequest.post<IDataType>({
    url: `/upload/picture?postId=${postId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function getPostDetails(postId: number) {
  return networkRequest.get<IDataType>({
    url: `/post/${postId}`
  });
}
