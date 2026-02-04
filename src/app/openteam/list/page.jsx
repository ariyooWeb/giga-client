"use client";
import React, { useState } from "react";
import { List, Button, Radio } from "antd"; // Import Button and Radio
import "./style.scss";
import { PlusOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import openteamData from "./data";

const OpenteamListPage = ({
  setCurrent,
  selectedValue,
  setSelectedValue,
  setFormMode, // New prop
}) => {
  const handleItemClick = (index) => {
    setSelectedValue(index);
    setCurrent("form");
    setFormMode("view"); // Set mode to 'view' when clicking an existing item
  };

  const handleCreate = () => {
    setSelectedValue(null);
    setCurrent("form");
    setFormMode("edit"); // Set mode to 'edit' when creating a new item
  };

  return (
    <div className="openteam-list-container">
      <div className="common-form">
        <div className="common-form-title">
          <h1 id="openteam-list-title">오픈팀 목록</h1>
          <button className="common-button right" onClick={handleCreate}>
            <PlusOutlined />
          </button>
        </div>
        <div className="team-list">
          {openteamData.map((item, index) => (
            <div
              className="team-list-item"
              onClick={() => handleItemClick(index)}
            >
              <div className="team-list-team">{item.date}</div>
              <div className="team-list-names">
                {item.leader}/{item.song}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenteamListPage;
