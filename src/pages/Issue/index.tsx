import React from 'react';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { getIssueList } from '../../services/ant-design-pro/issue';
import { PageContainer } from '@ant-design/pro-components';

// 表格列的配置
const columns: ProColumns<API.IssueTrackerItem>[] = [
  {
    title: '问题类型',
    dataIndex: 'issueType',
    key: 'issueType',
  },
  {
    title: '问题描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '问题解决人',
    dataIndex: 'resolver',
    key: 'resolver',
  },
  {
    title: '问题分数',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '是否解决',
    dataIndex: 'isResolved',
    key: 'isResolved',
    valueEnum: {
      0: { text: '未解决', status: 'Error' },
      1: { text: '已解决', status: 'Success' },
    },
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '更新者',
    dataIndex: 'updater',
    key: 'updater',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  return (
    <PageContainer>
      <ProTable<API.IssueTrackerItem>
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params);
          try {
            // 假设 getDeveloperList 返回一个 Promise，其中包含请求的响应数据
            const result = await getIssueList(params);
            console.log(result);
            // 根据你的结果结构，你可能需要调整这里的返回值
            return {
              data: result.result.records, // 假设响应中的数据在 data 属性中
              success: result.result.success, // 假设成功状态在 success 属性中
              total: result.result.total, // 如果有分页，你可能还需要返回 total
            };
          } catch (error) {
            console.error(error);
            return {
              data: [],
              success: false,
            };
          }
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        toolbar={{
          title: '项目存在的bug',
          tooltip: '所有的项目BUG',
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
            危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <Button type="primary" key="primary">
            创建应用
          </Button>,

          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '2',
                },
                {
                  label: '3rd item',
                  key: '3',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </PageContainer>

  );
};
