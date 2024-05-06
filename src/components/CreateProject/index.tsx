import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { addProject } from '../../services/ant-design-pro/project';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const CreateProject: React.FC = () => {
  const [form] = Form.useForm<{
    name: string;
    url: string;
    type: string;
    responsiblePerson: string;
  }>();
  return (
    <ModalForm<{
      name: string;
      url: string;
      type: string;
      responsiblePerson: string;
    }>
      title="新建项目"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建项目
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        const result = await addProject(values);
        if (result.code === 200) {
          message.success('提交成功');
          return true;
        }
        message.success('提交失败');
        return false;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="项目名称"
          tooltip="最长为 100 位"
          placeholder="请输入项目Git地址"
        />

        <ProFormText
          width="md"
          name="url"
          label="项目Git地址"
          tooltip="可输入GitLab、GitHUb、Gitee、Git私服等地址"
        />

        <ProFormText width="md" name="type" label="项目类型" tooltip="Maven、Node" />

        <ProFormText width="md" name="responsiblePerson" label="项目负责人" tooltip="项目负责人" />
      </ProForm.Group>
    </ModalForm>
  );
};
