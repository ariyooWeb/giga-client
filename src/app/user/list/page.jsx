"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import { Input, Tooltip, message } from "antd";
import StyledInput from "@/components/Input";
import { getUsersApi } from "@/tools/api";

const UserListMatrix = ({
  selectedUserIds = [],
  onUserSelect = () => {},
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersApi();
        // Assuming the API returns a 'data' object with a 'users' array inside
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          // Handle cases where the data is directly an array or other structures
          setUsers(response.data || response);
        }
      } catch (error) {
        message.error("Failed to fetch users.");
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    if (!disabled) {
      setSearchTerm(e.target.value);
    }
  };

  const filteredNames = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={`common-form ${disabled ? "disabled" : ""}`}>
      <div className="common-form-title">
        <h1>회원목록</h1>
      </div>
      <StyledInput
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
              style={{ cursor: disabled ? "not-allowed" : "pointer" }}
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
