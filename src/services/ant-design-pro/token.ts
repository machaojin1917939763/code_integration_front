// 用于在请求头中设置 token 的函数
export const setAuthToken = (options?: { [key: string]: any }) => {
  const token = localStorage.getItem('token');
  const headers = options?.headers || {};

  // 设置 Content-Type
  headers['Content-Type'] = 'application/json';

  // 如果存在 token，则在请求头中添加 Authorization
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(headers);

  return { ...options, headers };
};
