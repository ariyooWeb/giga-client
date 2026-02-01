"use client";
import React, { useState } from "react";
import { List, Button, Radio } from "antd"; // Import Button and Radio
import "./style.scss";
import { PlusOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import openteamData from "./data";

const OpenteamListPage = ({ setCurrent, selectedValue, setSelectedValue }) => {
  const handleItemClick = (index) => {
    setSelectedValue(index);
    setCurrent("form");
  };

  const handleCreate = () => {
    setSelectedValue(null);
    setCurrent("form");
  };

  return (
    <div className="openteam-list-container">
      <div className="openteam-list-actions">
        <div className="openteam-list-actions-right">
          <Button icon={<PlusOutlined />} onClick={handleCreate} />
        </div>
      </div>
      <div className="common-form">
        <h1 id="openteam-list-title">오픈팀 목록</h1>
        <List
          itemLayout="horizontal"
          dataSource={openteamData}
          renderItem={(item, index) => (
            <List.Item
              className={selectedValue === index ? "selected" : ""}
              onClick={() => handleItemClick(index)}
            >
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
    </div>
  );
};

export default OpenteamListPage;
