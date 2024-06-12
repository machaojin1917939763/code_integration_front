// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type DeveloperInfoItem = {
    key?: number;
    name?: string; // 开发人员姓名
    gender?: 'male' | 'female' | 'other'; // 性别，这个字段是 Object 类型，但通常我们会用字符串或枚举来表示性别
    department?: string; // 部门
    position?: string; // 职位
    phone?: string; // 电话
    email?: string; // 邮件
    projectId?: number; // 项目ID
    bugId?: number; // BUG ID
    score?: number; // 积分
    creator?: string; // 创建者
    createdAt?: string; // 创建时间，根据实际情况可能需要更改为 Date 类型或其他
    updater?: string; // 更新者
    updatedAt?: string; // 更新时间，根据实际情况可能需要更改为 Date 类型或其他
  };

  type IssueTrackerItem = {
    key?: number;
    issueType?: string; // 问题类型
    description?: string; // 问题描述
    resolver?: string; // 问题解决人
    score?: string; // 问题分数
    isResolved?: number; // 是否解决
    issueCreator?: string; // 是否解决
    projectName?: string; // 是否解决
    creator?: string; // 创建者
    createdAt?: string; // 创建时间，根据实际情况可能需要更改为 Date 类型或其他
    updater?: string; // 更新者
    updatedAt?: string; // 更新时间，根据实际情况可能需要更改为 Date 类型或其他
    record?: any;
    projectName?: any;
    component?: any;
  };
  type ProjectItem = {
    key?: string;
    name?: string; // 项目名称
    url?: string; // 项目地址
    type?: string; // 项目类型
    responsiblePerson?: string; // 项目负责人
    issueCount?: number; // 项目问题数
    issueId?: number; // 问题ID
    developerId?: number; // 开发人员表ID
    creator?: string; // 创建者
    createdAt?: string; // 创建时间，根据实际情况可能需要更改为 Date 类型或其他
    updater?: string; // 更新者
    updatedAt?: string; // 更新时间，根据实际情况可能需要更改为 Date 类型或其他
    record?: any;
    wsStatus?: any;
  };

  // 表格列的配置
  type Result = {
    code?: number;
    message?: string
    result?: any;
    type?: string;
  };
}
