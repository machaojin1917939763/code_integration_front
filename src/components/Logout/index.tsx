import { Button, List, Progress } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';

interface LogMessage {
  message: string;
}

export const ChatBox: React.FC<API.ProjectItem> = ({ record }) => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [progress, setProgress] = useState(0); // 使用状态来跟踪进度
  const listEndRef = useRef(null); // 创建一个ref来引用列表末尾的元素

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/create_project');

    ws.onopen = () => {
      ws.send(JSON.stringify(record));
    };

    ws.onmessage = (event) => {
      const data = event.data;
      const logMessage: LogMessage = { message: data };
      // 尝试将接收到的数据转换成数字作为进度
      const potentialProgress = Number(data);
      if (!isNaN(potentialProgress)) {
        setProgress(potentialProgress); // 更新进度
      } else {
        setLogs((prevLogs) => [...prevLogs, logMessage]);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    return () => {
      ws.close();
    };
  }, [record]); // 添加record作为依赖项

  useEffect(() => {
    if (listEndRef.current) {
      const element = listEndRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [logs]); // 依赖于logs数组来触发滚动

  // 省略了下载日志的函数...
  const downloadLogs = () => {
    // 将日志数组转换为字符串，每条消息占一行
    const logString = logs.map((log) => log.message).join('\n');
    const blob = new Blob([logString], { type: 'text/plain' });

    // 创建一个隐藏的a标签来下载文件
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'logs.txt'; // 文件名
    document.body.appendChild(a); // 附加到文档中以便能够触发点击事件
    a.click(); // 模拟点击下载文件
    document.body.removeChild(a); // 下载后移除元素
  };

  return (
    <div className="log-container">
      <h2>项目分析进度</h2>
      <Progress percent={progress} />
      <div ref={listEndRef} className="log-list">
        <List
          dataSource={logs}
          renderItem={(item, index) => {
            let className = '';
            if (item.message.includes('Info') || item.message.includes('INFO')) {
              return (
                <List.Item key={index} className="log-item-info">
                  {item.message}
                </List.Item>
              );
            } else if (item.message.includes('Error') || item.message.includes('ERROR')) {
              return (
                <List.Item key={index} className="log-item-error">
                  {item.message}
                </List.Item>
              );
            }
            return (
              <List.Item key={index} className={className}>
                {item.message}
              </List.Item>
            );
          }}
        />
      </div>
      <div className="download-button-container">
        <Button type="primary" onClick={downloadLogs}>
          下载日志
        </Button>
      </div>
    </div>
  );
};
