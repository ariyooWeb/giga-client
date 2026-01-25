"use client";
import React from "react";
import { List, Button } from "antd"; // Import Button
import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";

const OpenteamListPage = ({ setCurrent }) => {
  const openteamData = [
    { date: "2026-01-13", leader: "유아름", song: "walking down the street" },
    { date: "2026-01-20", leader: "김동현", song: "words" },
    { date: "2026-01-27", leader: "박선영", song: "bright side" },
    { date: "2026-02-03", leader: "최준호", song: "flying high" },

    { date: "2026-01-13", leader: "유아름", song: "walking down the street" },
    { date: "2026-01-20", leader: "김동현", song: "words" },
    { date: "2026-01-27", leader: "박선영", song: "bright side" },
    { date: "2026-02-03", leader: "최준호", song: "flying high" },
  ];

  return (
    <div className="openteam-list-page-container">
      <h1 id="openteam-list-title">오픈팀 목록</h1>
      <Button
        type="primary"
        style={{ position: "absolute", top: "37px", right: "20px" }}
        shape="sqaure"
        icon={<PlusOutlined />}
        onClick={() => setCurrent("form")}
      />
      <List
        itemLayout="horizontal"
        dataSource={openteamData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.date}
              description={
                <>
                  <div>
                    {item.leader}/{item.song}
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OpenteamListPage;
