import {
  BarChartOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  IssuesCloseOutlined,
  SecurityScanOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import { ListComponent } from '../components/List';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  numberCore: string;
  desc: string;
}> = ({ title, numberCore, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  const getIcon = (title: string) => {
    switch (title) {
      case '安全':
        return <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
      case '可靠性':
        return <IssuesCloseOutlined style={{ color: '#252B45' }} />;
      case '可维护性':
        return <CodeOutlined style={{ color: '#36B37E' }} />;
      case '接受问题':
        return <CheckCircleOutlined style={{ color: '#FF5630' }} />;
      case '覆盖率':
        return <BarChartOutlined style={{ color: '#FFAB00' }} />;
      case '重复':
        return <WarningOutlined style={{ color: '#5243AA' }} />;
      case '安全热点':
        return <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
      default:
        return <WarningOutlined style={{ color: '#5243AA' }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '16px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '50px', // 设置图标大小
            color: token.colorIconHover, // 假设 token 有一个颜色属性专门为图标设置
            marginRight: '0px', // 图标右侧的空间
            display: 'flex', // 使用 flex 布局，使得图标垂直居中
            alignItems: 'center', // 垂直居中对齐
          }}
        >
          {getIcon(title)}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '30px',
          color: token.colorTextHeading,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
      >
        {numberCore}
      </div>

      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '30px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 CodeIntegration
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            CodeIntegration 致力于开发一个基于SonarQube
            的代码质量评分系统，目的在于实现对项目和开发者的代码质量进行量化评估。该系统通过运用SonarQube
            进行静态代码分析，可以准确地检测出代码中的缺陷、坏味道、重复代码以及安全漏洞，并提供针对性的改进建议。利用SonarQube
            的分析接口及git
            的版本控制记录，该系统能为每个项目和每位开发者计算出一个反映代码质量的积分。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard numberCore="1k" title="安全" desc="" />
            <InfoCard numberCore="1k" title="可靠性" desc="" />
            <InfoCard numberCore="1k" title="可维护性" desc="" />
            <InfoCard title="接受问题" numberCore="1k" desc="" />
            <InfoCard title="覆盖率" numberCore="1k" desc="" />
            <InfoCard title="重复" numberCore="1k" desc="" />
            <InfoCard title="安全热点" numberCore="1k" desc="" />
          </div>
        </div>
        <br />
        <ListComponent />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
