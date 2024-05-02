// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { setAuthToken } from './token';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/login/currentUser', {
    method: 'GET',
    ...(setAuthToken(options)),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
   // 清除保存的 token
   localStorage.removeItem('token');
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(setAuthToken(options)),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const response = await request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    data: body,
    ...(setAuthToken(options)),
  });
  console.log("登录方法",response.result.token);
  // 如果登录成功且响应中包含 token，则保存它
  if (response.code === 200 && response.result.token) {
    console.log("登录成功，保存token");
    localStorage.setItem('token', response.result.token);
  }

  return response;
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(setAuthToken(options)),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(setAuthToken(options)),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(setAuthToken(options)),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(setAuthToken(options)),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(setAuthToken(options)),
    }
  });
}
