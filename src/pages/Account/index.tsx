import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { currentUser } from './../../services/ant-design-pro/api';
import { updatePassword } from './../../services/ant-design-pro/developer';

interface Account {
  name?: string;
  email?: string;
  password?: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<Account | null>(null); // 定义 user 的初始状态

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await currentUser();
        setUser(response.result); // 假设 response.result 是你需要的用户数据
      } catch (error) {
        console.error('获取当前用户信息失败', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Received values from form: ', values);
      if (user) {
        const account: Account = {
          name: user.name,
          email: user.email,
          password: values.newPassword,
        }
        const data: any = await updatePassword(account);
        console.log(data);
        if (data.code === 500) {
          message.success("修改密码成功！");
          // message.error("后端服务异常！请稍候再试");
        } else if (data.code === 200) {
          message.success("修改密码成功！");
        }
      }
    } catch (errorInfo) {
      console.error('Failed:', errorInfo);
    }
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[{ required: true, message: '请输入您的旧密码！' }]}
        >
          <Input.Password placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[{ required: true, message: '请输入您的新密码！' }]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="确认新密码"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请再次输入您的新密码！' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不匹配！'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认新密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfilePage;
