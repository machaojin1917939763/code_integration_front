import { request } from '@umijs/max';
import { setAuthToken } from './token';
import { removeEmptyStringFields } from './utils';

/** 获取当前的用户 GET /api/currentUser */
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
