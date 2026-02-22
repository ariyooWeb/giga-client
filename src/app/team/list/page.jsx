"use client";
import React, { useState } from "react";
import { List, Button, Radio } from "antd"; // Import Button and Radio
import { useSelector } from "react-redux"; // Import useSelector
import "./style.scss";
import { PlusOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import teamData from "./data";
// import namesExample from "../../user/list/data"; // Removed


const TeamListPage = ({
  onViewChange, // Renamed prop
  selectedValue,
  setSelectedValue,
  setFormMode, // New prop
}) => {
  const allUsers = useSelector((state) => state.user.users); // Get all users from Redux store

  const handleItemClick = (index) => {
    setSelectedValue(index);
    // Pass the usersIds of the selected team directly
    onViewChange("form", teamData[index].usersIds);
    setFormMode("view"); // Set mode to 'view' when clicking an existing item
  };

  const handleCreate = () => {
    setSelectedValue(null);
    // For a new team, pass an empty array for usersIds
    onViewChange("form", []);
    setFormMode("edit"); // Set mode to 'edit' when creating a new item
  };

  // Function to get user names from user IDs
  const getUserNames = (userIds) => {
    return userIds
      .map((id) => {
        const user = allUsers.find((user) => user.id === id); // Use allUsers
        return user ? user.name : null;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="team-list-container">
      <div className="common-form">
        <div className="common-form-title">
          <h1 id="team-list-title">팀 목록</h1>
          <button className="common-button right" onClick={handleCreate}>
            {<PlusOutlined />}
          </button>
        </div>
        <div className="team-list">
          {teamData.map((item, index) => (
            <div
              className={
                selectedValue === index
                  ? "selected team-list-item"
                  : "team-list-item"
              }
              onClick={() => handleItemClick(index)}
            >
              <div className="team-list-team">{item.team}</div>
              <div className="team-list-names">
                {getUserNames(item.usersIds)}
              </div>
            </div>
          ))}
        </div>
        {/* <List
          itemLayout="horizontal"
          dataSource={teamData}
          renderItem={(item, index) => (
            <List.Item
              className={selectedValue === index ? "selected" : ""}
              onClick={() => handleItemClick(index)}
              style={{
                cursor: "pointer",
                boxShadow: "7px 7px 14px #ccd3da, -7px -7px 14px #ffffff",
                borderRadius: 10,
                margin: 5,
                padding: 20,
              }}
            >
              <List.Item.Meta
                title={item.team}
                description={
                  <>
                    <div>{getUserNames(item.usersIds)}</div>
                  </>
                }
              />
            </List.Item>
          )}
        /> */}
      </div>
    </div>
  );
};

export default TeamListPage;
