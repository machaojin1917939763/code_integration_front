import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Avatar, message, Modal, Button, Form, Input, Select, Space } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { getDeveloperList, updateDevelop, addDevelop } from './../../services/ant-design-pro/developer';
import { currentUser, getAdmin } from './../../services/ant-design-pro/api';
import '../main.css';

const ShowInfo: React.FC<any> = ({ record, onRefresh }) => {

  console.log(record);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  form.setFieldsValue(record);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    const data: any = await updateDevelop(values);
    console.log(data);
    if (data.code === 200) {
      message.success('修改成功');
      onReset();
      handleCancel();
      // 刷新table
      onRefresh();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          完善个人信息
        </Button>
      </Space>
      <Modal
        open={open}
        title="完善个人信息"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>取消</Button>,
          <Button key="ok" type="primary" onClick={handleOk}>确定</Button>
        ]}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="id" label="唯一标识" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="avatar" label="头像" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
            <Select
              placeholder="请选择"
              allowClear
            >
              <Option value="male">男</Option>
              <Option value="female">女</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="department" label="部门" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="职位" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮件" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="score" label="积分" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default () => {
  const actionRef = useRef<any>();
  let name = "";
  let adminName = "";
  let email = "";
  let adminEmail = "";
  const refreshTable = () => {
    actionRef.current?.reload();
  };
  useEffect(() => {
    // 定义一个立即执行的异步函数
    const fetchData = async () => {
      try {
        // 使用 await 等待异步请求完成
        const data = await currentUser();
        const admin = await getAdmin();
        name = data.result.name;
        email = data.result.email;
        adminName = admin.result.name;
        adminEmail = admin.result.email;
      } catch (error) {
        // 如果有错误，可以在这里处理
        console.error('获取当前用户信息失败', error);
      }
    };

    // 调用 fetchData 函数
    fetchData();
  }, []);
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
      render: (_, record: API.DeveloperInfoItem) => {
        if (name === adminName && email === adminEmail) {
          return [
            <ShowInfo key="showInfo" record={record} onRefresh={refreshTable} />
          ];
        } else if (name === record.name && email === record.email) {
          return [
            <ShowInfo key="showInfo" record={record} onRefresh={refreshTable} />
          ];
        } else {
          return [
            <Button danger>无权限</Button>
          ];
        }

      },
    }
  ];
  return (
    <PageContainer>
      <div className="pro-table-container">
        <ProTable<API.DeveloperInfoItem>
          columns={columns}
          actionRef={actionRef}
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
        />
      </div>
    </PageContainer>
  );
};
