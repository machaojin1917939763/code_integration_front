import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'CodeIntegration',
          title: 'CodeIntegration',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '#',
          blankTarget: true,
        },
        {
          key: 'Ma Chaojin',
          title: 'Ma Chaojin',
          href: 'https://maapp.top',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
