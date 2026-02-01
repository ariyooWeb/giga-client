"use client";
import React, { useState } from "react";
import "./style.scss";
import { Input, Tooltip } from "antd";

import namesExample from "./data";

const UserListMatrix = ({ selectedUserIds = [], onUserSelect = () => {}, disabled = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    if (!disabled) { // Only allow search if not disabled
      setSearchTerm(e.target.value);
    }
  };

  const filteredNames = namesExample.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={`user-list-matrix ${disabled ? 'disabled' : ''}`}>
      <h1>회원목록</h1>
      <Input
        placeholder="이름을 입력하세요"
        value={searchTerm}
        onChange={handleSearchChange}
        disabled={disabled} // Disable search input
      />
      <div className="user-list-matrix-grid">
        {filteredNames.map((user, index) => {
          const isSelected = selectedUserIds.includes(user.id);
          return (
            <div
              key={index}
              className={`user-list-matrix-item ${isSelected ? "selected" : ""}`}
              onClick={() => {
                if (!disabled) {
                  onUserSelect(user.id);
                }
              }}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              <Tooltip title={user.nickname}>
                <span>{user.name}</span>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserListMatrix;
