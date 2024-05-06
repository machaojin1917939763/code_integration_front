import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { CreateProject } from '../../components/CreateProject';
import { Loading } from '../../components/Loading';
import { getProjectList } from '../../services/ant-design-pro/project';

// 表格列的配置

const columns: ProColumns<API.ProjectItem>[] = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '项目地址',
    dataIndex: 'url',
    key: 'url',
    ellipsis: true,
  },
  {
    title: '项目类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '项目负责人',
    dataIndex: 'responsiblePerson',
    key: 'responsiblePerson',
  },
  {
    title: '项目问题数',
    dataIndex: 'issueCount',
    key: 'issueCount',
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
    valueType: 'dateTime',
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
    valueType: 'dateTime',
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    width: 180,
    render: (record) => [<Loading key={1} record={record} />],
  },
];

export default () => {
  return (
    <PageContainer>
      <ProTable<API.ProjectItem>
        columns={columns}
        request={async (params) => {
          try {
            // 假设 getDeveloperList 返回一个 Promise，其中包含请求的响应数据
            const result = await getProjectList(params);
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
          title: '项目表',
          tooltip: '所有的项目',
        }}
        toolBarRender={() => [<CreateProject key={1} />]}
      />
    </PageContainer>
  );
};
