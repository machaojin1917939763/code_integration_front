import React, { useEffect, useRef, useState } from 'react';
import { Table, Card, Col, Row } from 'antd';
import { Column, Pie } from '@ant-design/charts';
import { getIssueAllList, getIssueListType } from '../services/ant-design-pro/issue';
import { getProjectList } from '../services/ant-design-pro/project';
import "./Welcome.css"

const Dashboard: React.FC = () => {
  const [issueData, setIssueData] = useState<any[]>([]);
  const [issueTypeData, setIssueTypeData] = useState<Map<string, number>>(new Map());
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const [issueRes, projectRes, issueTypeRes] = await Promise.all([
        getIssueAllList(""),
        getProjectList(""),
        getIssueListType("")
      ]);

      setIssueData(issueRes.result.records);
      setProjectData(projectRes.result.records);
      setIssueTypeData(issueTypeRes.result);
      console.log("11111",issueTypeRes);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const pieConfig = {
    appendPadding: 10,
    data: issueTypeData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setupScrolling();
  }, [issueData]);

  const setupScrolling = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (scrollContainer.scrollTop >= (scrollContainer.scrollHeight - scrollContainer.offsetHeight)) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 1;
      }
    }, 50);

    return () => clearInterval(interval);
  };

  const columns = [
    { title: "问题类型", dataIndex: "issueType", key: "issueType" },
    { title: "问题描述", dataIndex: "description", key: "description" },
    { title: "问题得分", dataIndex: "score", key: "score" },
    { title: "是否解决", dataIndex: "isResolved", key: "isResolved" },
    { title: "BUG缔造者", dataIndex: "issueCreator", key: "issueCreator" },
    { title: "所属项目", dataIndex: "projectName", key: "projectName" }
  ];

  return (
    <div className="dashboard-card-wrapper">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="项目问题概览" bordered={false}>
            <Column data={projectData.map(d => ({ name: d.name, issueCount: d.issueCount }))} xField='name' yField='issueCount' />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="问题类型" bordered={false}>
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="问题滚动屏" bordered={false}>
            <div className="pro-table-container" ref={scrollRef} style={{ overflowY: 'auto', maxHeight: '600px' }}>
              <Table dataSource={issueData} columns={columns} pagination={false} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
