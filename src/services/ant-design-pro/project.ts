import { request } from '@umijs/max';
import { setAuthToken } from './token';
import { removeEmptyStringFields } from './utils';

export async function getProjectList(body: any) {
  const newBody = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/project/getList', {
    method: 'POST',
    params: {
      // 这里传递URL查询参数
      current: newBody.current,
      pageSize: newBody.pageSize,
    },
    data: newBody,
    ...setAuthToken(newBody),
  });
}

export async function addProject(body: any) {
  const newBody = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/project', {
    method: 'POST',
    data: newBody,
    ...setAuthToken(newBody),
  });
}
