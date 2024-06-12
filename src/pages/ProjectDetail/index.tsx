import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { Button, Drawer, Space, DrawerProps, Table, Input, theme, Typography } from 'antd';
const { TextArea } = Input;
const { Paragraph } = Typography;
import {
  BarChartOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  IssuesCloseOutlined,
  SecurityScanOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { getProjectDetail, getProjectIntroduce } from '../../services/ant-design-pro/sonar'

const AlertStatusIcon = () => <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
const CoverageIcon = () => <BarChartOutlined style={{ color: '#FFAB00' }} />;
const DuplicatedLinesDensityIcon = () => <WarningOutlined style={{ color: '#5243AA' }} />;
const MaintainabilityIssuesIcon = () => <CodeOutlined style={{ color: '#36B37E' }} />;
const NclocIcon = () => <CheckCircleOutlined style={{ color: '#FF5630' }} />;
const NclocLanguageDistributionIcon = () => <CheckCircleOutlined style={{ color: '#FF5630' }} />;
const ReliabilityIssuesIcon = () => <IssuesCloseOutlined style={{ color: '#252B45' }} />;
const ReliabilityRatingIcon = () => <IssuesCloseOutlined style={{ color: '#252B45' }} />;
const SecurityHotspotsReviewedIcon = () => <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
const SecurityIssuesIcon = () => <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
const SecurityRatingIcon = () => <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
const SecurityReviewRatingIcon = () => <SecurityScanOutlined style={{ color: '#3DA5F4' }} />;
const SqaleRatingIcon = () => <CheckCircleOutlined style={{ color: '#FF5630' }} />;

const SecurityIssuesSummary = ({ data }) => {
  console.log(data)
  const { LOW, MEDIUM, HIGH, total } = JSON.parse(data);


  const style = {
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      borderRadius: '8px',
      color: '#333',
      fontWeight: 'bold'
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    total: {
      color: 'black',
      fontSize: '24px'
    },
    low: {
      color: 'green',
      fontSize: '18px'
    },
    medium: {
      color: 'orange',
      fontSize: '18px'
    },
    high: {
      color: 'red',
      fontSize: '18px'
    }
  };

  return (
    <div style={style.container}>
      <div style={style.item}>
        <div style={style.low}>低危：</div>
        <span></span>
        <div>{LOW}</div>
      </div>
      <div style={style.item}>
        <div style={style.medium}>中危：</div>
        <span></span>
        <div>{MEDIUM}</div>
      </div>
      <div style={style.item}>
        <div style={style.high}>高危：</div>
        <div>{HIGH}</div>
      </div>
      <div style={style.item}>
        <div style={style.total}>总计：</div>
        <span></span>
        <div>{total}</div>
      </div>
    </div>
  );
};
type LanguageDataProps = {
  data: string;
};
const LanguageData: React.FC<LanguageDataProps> = ({ data }) => {
  const languages = data.split(';').map(item => {
    const [language, count] = item.split('=');
    return { language, count: Number(count) };
  });

  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: 'auto'
    },
    header: {
      margin: '0 0 20px 0',
      padding: '0',
      color: '#333',
      textAlign: 'center' as 'center'
    },
    list: {
      listStyleType: 'none',
      padding: '0',
      margin: '0'
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#f2f4f8',
      transition: 'background-color 0.2s ease'
    },
    listItemHover: {
      backgroundColor: '#e1e5ea'
    },
    language: {
      fontWeight: 'bold'
    },
    count: {
      fontWeight: 'normal'
    }
  };

  return (
    <div style={style.container}>
      <h3 style={style.header}>语言数据</h3>
      <ul style={style.list}>
        {languages.map((item, index) => (
          <li key={index} style={style.listItem} className="list-item">
            <span style={style.language}>{item.language}</span>
            <span></span>
            <span style={style.count}>{item.count}行</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const InfoCard: React.FC<{
  title: string;
  numberCore: string;
  desc: string;
}> = ({ title, numberCore, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  const getIcon = (title: string) => {
    switch (title) {
      case '安全状态':
        return <AlertStatusIcon />;
      case '安全问题':
        return <SecurityIssuesIcon />;
      case '安全评级':
        return <SecurityRatingIcon />;
      case '安全审查评级':
        return <SecurityIssuesIcon />;
      case '可靠性问题':
        return <ReliabilityIssuesIcon />;
      case '可靠性评级':
        return <ReliabilityIssuesIcon />;
      case '可维护性问题':
        return <MaintainabilityIssuesIcon />;
      case '测试覆盖率':
        return <CoverageIcon />;
      case '代码重复率':
        return <DuplicatedLinesDensityIcon />;
      case '已审查的安全热点':
        return <SecurityHotspotsReviewedIcon />;
      case '非注释代码行数':
        return <NclocIcon />;
      case '按语言分类的代码行数分布':
        return <NclocLanguageDistributionIcon />;
      case '技术债务评级':
        return <SqaleRatingIcon />;
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
        {/* 如果desc是json数据，就放用SecurityIssuesSummary显示，否则正常显示 */}
        {title === '可维护性问题' || title === '可靠性问题' || title === '安全问题' ? (
          <SecurityIssuesSummary data={numberCore} />
        ) : (title === '按语言分类的代码行数分布' ? (<LanguageData data={numberCore} />) : numberCore)}
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

const Component: React.FC<any> = ({ projectDetail }) => {
  // 创建一个映射，将每个指标的名称映射到它的描述
  const metricDescriptions: any = {
    "alert_status": "安全评分是基于代码中的安全漏洞和安全热点的综合评分。",
    "coverage": "覆盖率是指代码中被测试覆盖的百分比。",
    "duplicated_lines_density": "重复是指代码中的重复行数。",
    "maintainability_issues": "可维护性评分是基于代码中的重复和复杂度的综合评分。",
    "ncloc": "非注释行数，是指代码库中不包括注释和空行的代码行数。",
    "ncloc_language_distribution": "代码行数分布，是指按编程语言分类的代码行数。",
    "reliability_issues": "可靠性问题是指在代码中识别的可能会导致错误行为的bug。",
    "reliability_rating": "可靠性评级是基于可靠性问题的严重性和数量的评级。",
    "security_hotspots_reviewed": "已审查的安全热点是指已经被审查并且确定是否需要采取行动的安全问题的百分比。",
    "security_issues": "安全问题是指在代码中发现的安全问题。",
    "security_rating": "安全评分是基于代码中的安全问题的严重性和数量的评分。",
    "security_review_rating": "安全审查评级是基于对安全热点的审查情况的度量。",
    "sqale_rating": "技术债务比率评级是基于为解决代码库中的可维护性问题而应付出的努力相对于整个代码库的比例。"
  };
  const arr: any = {
    "alert_status": "安全状态",
    "coverage": "测试覆盖率",
    "duplicated_lines_density": "代码重复率",
    "maintainability_issues": "可维护性问题",
    "ncloc": "非注释代码行数",
    "ncloc_language_distribution": "按语言分类的代码行数分布",
    "reliability_issues": "可靠性问题",
    "reliability_rating": "可靠性评级",
    "security_hotspots_reviewed": "已审查的安全热点",
    "security_issues": "安全问题",
    "security_rating": "安全评级",
    "security_review_rating": "安全审查评级",
    "sqale_rating": "技术债务评级"
  }

  return (
    <>
      {projectDetail.map((item, index) => (
        <ProCard split="horizontal">
          <ProCard colSpan={24} bordered>
            <InfoCard
              title={arr[item.metric]}
              numberCore={item.value}
              desc={metricDescriptions[item.metric]}
            />
          </ProCard>
        </ProCard>
      ))}
    </>
  );
};
interface Record {
  name: string | { key: string; name: string; isDefault?: boolean };
  createdAt: string;
}

interface Inroduce {
  description?: string;
  analysisDate?: string;
  branch?: string;
  qualityGate?: { key: string; name: string; isDefault: boolean };
  breadcrumbs?: { key: string; name: string }[];
}

interface ProjectCardProps {
  record: Record;
  inroduce?: Inroduce;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ record, inroduce }) => (
  <ProCard split="vertical" ghost gutter={20} style={{ margin: '20px', backgroundColor: '#f0f2f5' }}>
    <h2>项目基本信息</h2>
    <ProCard colSpan={24} bordered>
      <StatisticCard
        key={typeof record.name === 'string' ? record.name : record.name.name}
        title=""
        statistic={{
          value: typeof record.name === 'string' ? record.name : record.name.name,
          description: (
            <div>
              <Paragraph>
                <h5>项目描述：{inroduce?.description || "请先启动分析"}</h5>
              </Paragraph>
              <Paragraph>
                <h5>创建时间：{record.createdAt}</h5>
              </Paragraph>
              <Paragraph>
                <h5>分析时间：{inroduce?.analysisDate || "请先启动分析"}</h5>
              </Paragraph>
              <Paragraph>
                <h5>分支名：{inroduce?.branch || "请先启动分析"}</h5>
              </Paragraph>
              <Paragraph>
                <h5>分析规则：{inroduce?.qualityGate?.name || "请先启动分析"}</h5>
              </Paragraph>
            </div>
          ),
        }}
      />
    </ProCard>
  </ProCard>
);

export const ProjectDetail: React.FC<API.ProjectItem> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const [projectDetail, setProjectDetail] = useState(null);
  const [inroduce, setIntroduce] = useState(null);


  const showLargeDrawer = async () => {
    const res: any = await getProjectDetail(record.sonarKey);
    const projectIntruduce: any = await getProjectIntroduce(record.sonarKey);
    setIntroduce(projectIntruduce.result);
    setProjectDetail(res.result.measures);
    console.log(projectIntruduce.result);
    // console.log(res.result.measures);
    setSize('large');
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        type='text'
        onClick={showLargeDrawer}
        size="small"
      >
        {record.name}
      </Button>
      <Drawer
        title={record.name}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              隐藏
            </Button>
          </Space>
        }
        style={{ overflow: 'auto', maxHeight: '100vh' }}
      >
        <ProjectCard record={record} inroduce={inroduce ? inroduce : null} />
        <Component projectDetail={projectDetail ? projectDetail : []} />
      </Drawer>
    </>
  );
}
