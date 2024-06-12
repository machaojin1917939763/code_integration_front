import React, { useState, useEffect } from 'react';
import { Avatar, Card, Row, Col, Button } from 'antd';
import "./index.css"
import { getAllDeveloperBySort } from "../../services/ant-design-pro/developer";

// 定义玩家类型
type Player = {
  name: string;
  score: number;
  avatar: string; // 头像链接
};


const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]); // 用于存储玩家数据

  useEffect(() => {
    const fetchData = async () => {
      console.log("初始化加载");
      try {
        const data: any = await getAllDeveloperBySort();
        console.log(data.result);
        setPlayers(data.result); // 将获取的玩家数据设置到状态中
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchData();
  }, []); // 注意第二个参数是空数组，表示只在组件加载时执行一次
  // 渲染玩家列表
  return (
    <div className="pro-table-container">
      <div className="leaderboard-container">
        <div className="top-players">
          {players.slice(0, 3).map((player, index) => (
            <Card key={index} className={`player-card ${index === 0 ? 'gold' : index === 1 ? 'bronze' : 'silver'}`}>
              <div className="rank-badge">{index + 1}</div>
              <Avatar size={128} src={player.avatar} />
              <div className="player-name">{player.name}</div>
              <div className="player-score">开发积分: {player.score}</div>
            </Card>
          ))}
        </div>
        <div className="other-players">
          {players.slice(3).map((player, index) => (
            <Card key={index} className="player-card-other">
              <div className="rank-badge">{index + 4}</div>
              <Avatar size={64} src={player.avatar} />
              <span className="player-name" style={{ marginLeft: '20px' }}>{player.name}</span>
              <span className="player-score" style={{ float: 'right' }}>开发积分: {player.score}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
