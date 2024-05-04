import { List } from 'antd';
import React from 'react';
import './index.css';

interface Ranking {
  name: string;
  score: number;
}

const rankings: Ranking[] = [
  { name: 'Alice', score: 98 },
  { name: 'Bob', score: 95 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  { name: 'Charlie', score: 93 },
  // 假设这里还有更多排名数据
];

const RankingsPage: React.FC = () => {
  const topThree = rankings.slice(0, 3);
  const others = rankings.slice(3);

  return (
    <div>
      <div className="top-rankings">
        {topThree.map((ranking, index) => (
          <div key={ranking.name} className={`rank-item rank-${index + 1}`}>
            {index + 1}. {ranking.name} - {ranking.score}
          </div>
        ))}
      </div>
      <List
        header={<div>其他排名</div>}
        bordered
        dataSource={others}
        renderItem={(item) => (
          <List.Item>
            {item.name} - {item.score}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RankingsPage;
