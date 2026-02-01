"use client";
import React, { useState } from "react";
import "./style.scss";
import { Input, Tooltip } from "antd";

import namesExample from "./data";

const UserListMatrix = ({ selectedUserIds = [], onUserSelect = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNames = namesExample.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="user-list-matrix">
      <h1>회원목록</h1>
      <Input
        placeholder="이름을 입력하세요"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="user-list-matrix-grid">
        {filteredNames.map((user, index) => {
          const isSelected = selectedUserIds.includes(user.id);
          return (
            <div
              key={index}
              className={`user-list-matrix-item ${isSelected ? "selected" : ""}`}
              onClick={() => onUserSelect(user.id)}
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
