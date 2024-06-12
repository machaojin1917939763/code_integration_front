import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Drawer, Space, DrawerProps, Typography, Input, Timeline, message } from 'antd';
const { TextArea } = Input;
import React, { useState } from 'react';
import { getIssueDetail, getIssueDetailForRedis, getRule, postNewComment } from '../../services/ant-design-pro/sonar'

interface CodeBlockProps {
  code: string;
  line: number;
  targetLine: number;
  startChar: number;
  endChar: number;
}

interface CommentProps {
  comment: any; // 你需要替换 any 为你的具体类型
}


const CodeBlock: React.FC<CodeBlockProps> = ({ code, line, targetLine, startChar, endChar }) => {
  // 创建一个临时的DOM元素来转换HTML字符串
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = code;

  // 遍历文本节点的函数
  function traverseAndHighlight(node: any, charCount = 0) {
    if (node.nodeType === 3) { // Node.TEXT_NODE
      const nextCharCount = charCount + node.length;
      if (line === targetLine && nextCharCount > startChar && charCount < endChar) {
        const range = document.createRange();
        const start = Math.max(0, startChar - charCount);
        const end = Math.min(node.length, endChar - charCount);
        range.setStart(node, start);
        range.setEnd(node, end);
        const wrapper = document.createElement('span');
        wrapper.style.textDecoration = 'underline red wavy';
        range.surroundContents(wrapper);
      }
      return nextCharCount;
    } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
      let child = node.firstChild;
      while (child) {
        charCount = traverseAndHighlight(child, charCount);
        child = child.nextSibling;
      }
    }
    return charCount;
  }

  // 遍历并高亮范围内的文本
  traverseAndHighlight(tempDiv);

  return (
    <div style={{ display: 'flex' }}>
      <span style={{ width: '20px', textAlign: 'right', paddingRight: '5px' }}>
        {line}
      </span>
      <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />
    </div>
  );
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div style={{ marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
      <div dangerouslySetInnerHTML={{ __html: comment.htmlText }} />
      <div style={{ fontWeight: 'bold' }}>{comment.login}</div>
      <div style={{ color: '#999', fontSize: '12px' }}>{comment.createdAt}</div>
    </div>
  )
};

export const IssueDetail: React.FC<API.IssueTrackerItem> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const [component, setComponent] = useState(null);
  const [sources, setSources] = useState([]);
  const [detailForRedis, setdetailForRedis] = useState(null);
  const [rule, setrule] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const showLargeDrawer = async () => {
    const detail: any = await getIssueDetail(record.issueKey);
    let detailForRedis: any = await getIssueDetailForRedis(record.issueKey);
    // 将JSON字符串转换为对象
    detailForRedis = JSON.parse(detailForRedis.result);
    const rule: any = await getRule(detailForRedis.rule);
    setComponent(detail.result.component);
    setSources(detail.result.sources);
    setdetailForRedis(detailForRedis);
    setrule(rule.result.rule);
    setCommentList(detailForRedis.comments);

    setSize('large');
    setOpen(true);
  };

  const handleSubmitComment = async () => {
    try {
      // 初始化data对象
      let data: { issue: string; text: string } = {
        issue: detailForRedis ? detailForRedis.key : "",
        text: newComment
      };

      // 发送newComment到服务器
      const response: any = await postNewComment(data);
      const responceComment: any = JSON.parse(response.result);
      // 假设服务器返回了更新后的评论列表，这里你需要替换为正确的属性
      console.log(responceComment.issue.comments);
      setCommentList(responceComment.issue.comments);
      // 由于你没有提供setComments或相似的函数，我会假设它存在
      // 以下是一个示例，你需要根据你的实际情况进行调整
      // setComments(response.comments);
      console.log(response);

      // 清空输入框
      setNewComment('');
      message.success("评论成功");
    } catch (error) {
      // 处理错误，比如显示错误消息
      console.error(error);
      message.error('Failed to submit comment');
    }
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
        <Typography.Text
          copyable
          ellipsis={{ tooltip: record.description }}
          style={{ maxWidth: '100px' }}
        >
          {record.description}
        </Typography.Text>
      </Button>
      <Drawer
        title={record.description}
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
      >
        <ProCard
          tabs={{
            type: 'card',
            items: [
              {
                key: 'tab1',
                label: '项目路径',
                children:
                  <>
                    <h3>主要问题：{record.description}</h3>
                    <h3>所属项目：{component ? component.projectName : '加载中...'}</h3>
                    <h3>问题类型：{record.issueType}</h3>
                    <h3>文件路径：
                      <Typography.Text
                        copyable
                        ellipsis={{ tooltip: component ? component.longName : '加载中...' }}
                        style={{ maxWidth: 200 }} // 可以根据需要修改最大宽度
                      >
                        {component ? component.longName : '加载中...'}
                      </Typography.Text>
                    </h3>
                    <h3>文件名：{component ? component.name : '加载中...'}
                    </h3>
                  </>,
              },
              {
                key: 'tab2',
                label: '详细代码',
                children: (
                  <>
                    <h2>需要修复代码行：{detailForRedis ? detailForRedis.line : "加载中....."}</h2>
                    <h2>预估修复时间：{detailForRedis ? detailForRedis.effort : "加载中....."}</h2>
                    <h2>修复规则：{detailForRedis ? detailForRedis.rule : "加载中....."}</h2>
                    <pre>
                      <code>
                        {sources.map((source: any, index) => (
                          <CodeBlock
                            key={index}
                            line={source.line}
                            code={source.code}
                            targetLine={detailForRedis ? detailForRedis.line : 1}
                            startChar={detailForRedis ? detailForRedis.textRange.startOffset : 0}
                            endChar={detailForRedis ? detailForRedis.textRange.endOffset : 100}
                          />
                        ))}
                      </code>
                    </pre>
                  </>

                ),
              },
              {
                key: 'tab3',
                label: '解决方案',
                children:
                  <>
                    {rule && (
                      <div dangerouslySetInnerHTML={{ __html: rule.mdDesc }} />
                    )}
                  </>
              },
              {
                key: 'tab4',
                label: '评论',
                children: (
                  <>
                    <div>
                      <h3>评论</h3>
                      {commentList ? (
                        <Timeline>
                          {commentList.map((comment) => (
                            <Timeline.Item key={comment.key}>
                              <Comment comment={comment} />
                            </Timeline.Item>
                          ))}
                        </Timeline>
                      ) : "加载中...."}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <TextArea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="写下你的评论..."
                        style={{ resize: 'none' }}
                      />
                      <Button
                        type="primary"
                        onClick={handleSubmitComment}
                        style={{ marginTop: '10px' }}
                      >
                        提交评论
                      </Button>
                    </div>
                  </>
                ),
              }
            ],
          }}
        >
        </ProCard >
      </Drawer >
    </>
  );
}
