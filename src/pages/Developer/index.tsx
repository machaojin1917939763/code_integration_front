import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Input } from 'antd';
import { getDeveloperList } from './../../services/ant-design-pro/developer'
import { PageContainer } from '@ant-design/pro-components';



const columns: ProColumns<API.DeveloperInfoItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,

  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      male: { text: '男' },
      female: { text: '女' },
      other: { text: '其他' },
    },
  },
  {
    title: '部门',
    dataIndex: 'department',
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'position',
    ellipsis: true,
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮件',
    dataIndex: 'email',
  },
  {
    title: '项目ID',
    dataIndex: 'projectId',
    valueType: 'digit',
    hideInSearch: true,
  },
  {
    title: 'BUG ID',
    dataIndex: 'bugId',
    valueType: 'digit',
    hideInSearch: true,
  },
  {
    title: '积分',
    dataIndex: 'score',
    valueType: 'digit',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '更新者',
    dataIndex: 'updater',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.name);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
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
      <ProTable<API.DeveloperInfoItem>
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params);
          try {
            // 假设 getDeveloperList 返回一个 Promise，其中包含请求的响应数据
            const result = await getDeveloperList(params);
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
          title: '开发人员信息表',
          tooltip: '所有的开发人员',
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
