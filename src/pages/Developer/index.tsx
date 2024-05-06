import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Avatar, Button } from 'antd';
import { getDeveloperList } from './../../services/ant-design-pro/developer';

const columns: ProColumns<API.DeveloperInfoItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 72,
    render: (_: React.ReactNode, entity: Entity) => (
      <Avatar shape="square" size={64} src={<img src={entity.avatar} alt="avatar" />} />
    ),
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
    title: '积分',
    dataIndex: 'score',
    valueType: 'digit',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
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
        request={async (params) => {
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
          <Button type="primary" key="primary">
            添加开发者
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
