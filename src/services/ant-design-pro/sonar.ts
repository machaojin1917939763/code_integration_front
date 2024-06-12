import { request } from '@umijs/max';
import { setAuthToken } from './token';


export async function getIssueDetail(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/sources/issue_snippets', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}
export async function getIssueDetailForRedis(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/sources/issue_redis', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function getRule(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/sources/rule', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function postNewComment(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/sources/add_comment', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function getProjectDetail(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/measure/get_project_detail', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}

export async function getProjectIntroduce(body: string) {
  return request<{
    data: any;
  }>('/api/sonar/navigation/get_project_introduce', {
    method: 'POST',
    data: body,
    ...(setAuthToken(body)),
  });
}


