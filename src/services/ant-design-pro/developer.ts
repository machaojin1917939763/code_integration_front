import { request } from '@umijs/max';
import { setAuthToken } from './token';
import { removeEmptyStringFields } from './utils';


export async function getDeveloperList(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/developer/getList', {
    method: 'POST',
    params: { // 这里传递URL查询参数
      current: body.current,
      pageSize: body.pageSize,
    },
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function addDevelop(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/developer', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function updateDevelop(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/developer', {
    method: 'PUT',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function getAllDeveloperBySort() {
  return request<{
    data: any;
  }>('/api/developer/sort', {
    method: 'POST',
    ...(setAuthToken(null)),
  });
}

export async function updatePassword(body: any) {
  return request<{
    data: any;
  }>('/api/developer/password', {
    method: 'POST',
    ...(setAuthToken(body)),
  });
}
