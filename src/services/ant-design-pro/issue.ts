import { request } from '@umijs/max';
import { setAuthToken } from './token';
import { removeEmptyStringFields } from './utils';

/** 获取当前的用户 GET /api/currentUser */
export async function getIssueList(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/issue/getList', {
    method: 'POST',
    params: { // 这里传递URL查询参数
      current: body.current,
      pageSize: body.pageSize,
    },
    data: body,
    ...(setAuthToken(body)),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function getIssueAllList(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/issue/getAllList', {
    method: 'GET',
    ...(setAuthToken(body)),
  });
}

export async function getIssueListType(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/issue/getListType', {
    method: 'GET',
    ...(setAuthToken(body)),
  });
}

export async function updateIssue(body: any) {
  body = removeEmptyStringFields(body);
  return request<{
    data: API.CurrentUser;
  }>('/api/issue', {
    method: 'PUT',
    params: { // 这里传递URL查询参数
      current: body.current,
      pageSize: body.pageSize,
    },
    data: body,
    ...(setAuthToken(body)),
  });
}
