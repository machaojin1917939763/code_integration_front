import { EllipsisOutlined } from '@ant-design/icons';
import React, { useCallback, useRef, useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Tag, message } from 'antd';
import { getIssueList, updateIssue } from '../../services/ant-design-pro/issue';
import { IssueDetail } from '../IssueDetail';
import '../main.css';
import { currentUser } from './../../services/ant-design-pro/api';


export default () => {
  const actionRef = useRef();
  const [username, setUsername] = useState("");
  // 使用 useCallback 防止函数在每次渲染时重新创建
  const update = useCallback(async (record: API.IssueTrackerItem, type: string) => {
    if(type === "EMAIL"){
      message.success("已邮件提醒" + record.issueCreator);
    }
    let isResolved = type;
    record.updater = undefined;
    record.updatedAt = undefined;
    const data = { ...record, isResolved: isResolved };
    try {
      const result: API.Result = await updateIssue(data);
      if (result.code === 200) { // 假设 result 对象有一个 success 属性标识请求是否成功
        message.success("操作成功");
        if (actionRef.current) {
          actionRef.current.reload();
        }
      } else {
        message.error("修改状态失败");
      }
    } catch (error) {
      console.error(error);
      message.error("修改状态失败");
    }
  }, []);

  const issueTypeMap = {
    BUG: <Tag color="red">BUG</Tag>,
    CODE_SMELL: <Tag color="blue">代码坏味道</Tag>,
    VULNERABILITY: <Tag color="red">系统漏洞</Tag>,
  };

  useEffect(() => {
    // 定义一个立即执行的异步函数
    const fetchData = async () => {
      try {
        // 使用 await 等待异步请求完成
        const admin = await currentUser();
        setUsername(admin.result.name);
      } catch (error) {
        // 如果有错误，可以在这里处理
        console.error('获取当前用户信息失败', error);
      }
    };
    // 调用 fetchData 函数
    fetchData();
  }, []);

  const columns: ProColumns<API.IssueTrackerItem>[] = [
    {
      title: '问题类型',
      dataIndex: 'issueType',
      key: 'issueType',
      render: (_, record) => {
        // 使用映射的值来显示不同内容，如果没有对应的映射则显示文本
        return issueTypeMap[record.issueType] || record.issueType;
      },
    },
    {
      title: '问题描述',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <IssueDetail record={record} />
      },
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
      render: (text, record) => {
        const valueEnum = {
          "OPEN": { text: '未解决', status: 'Error' },
          "CONFIRMED": { text: '已完成', status: 'Success' },
          "HALF_OPEN": { text: '已分配', status: 'Success' },
        };
        const status = valueEnum[text] || { text: '未知状态', status: 'Default' };

        return (
          <Tag color={status.status === 'Error' ? 'red' : status.status === 'Success' ? 'green' : 'gray'}>
            {status.text}
          </Tag>
        );
      },
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'BUG缔造者',
      dataIndex: 'issueCreator',
      key: 'issueCreator',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      key: 'projectName',
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
      render: (_, record) => {
        if (record.isResolved === "OPEN") {
          return [<Button
            key="nextStatus"
            type="primary"
            onClick={() => update({ ...record }, "HALF_OPEN")}
          >
            分配给我
          </Button>,
          <Button
          danger
          key="email"
          onClick={() => update({ ...record }, "EMAIL")}
          >邮件提醒</Button>
          ];
        } else if (record.isResolved === "HALF_OPEN" && username === record.updater) {
          return [
            <Button
              danger
              key="HALF_OPEN"
              type="primary"
              onClick={() => update({ ...record }, "OPEN")
              }
            >
              撤销分配
            </Button>
          ];
        } else {
          return [
            <Button disabled block>
              已被分配
            </Button>
          ];
        }

      },
    },
  ]

  return (
    <PageContainer>
      <div className="pro-table-container">
        <ProTable<API.IssueTrackerItem>
          columns={columns}
          actionRef={actionRef}
          request={async (params) => {
            try {
              // 假设 getDeveloperList 返回一个 Promise，其中包含请求的响应数据
              const result = await getIssueList(params);
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

          ]}
        />
      </div>
    </PageContainer>
  );
};
