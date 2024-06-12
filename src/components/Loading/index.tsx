import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import { ChatBox } from '../../components/Logout';

export const Loading: React.FC<API.ProjectItem> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button
          key="startSonarQube"
          type="link"
          size="small"
          onClick={() => {
            showDrawer();
          }}
        >
          启动SonarQube分析项目
        </Button>
      </Space>
      <Drawer
        title="项目日志"
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        key="top"
      >
        <ChatBox record={record}  wsStatus={open}/>
      </Drawer>
    </>
  );
};
