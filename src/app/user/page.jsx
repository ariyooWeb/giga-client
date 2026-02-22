"use client";
import React from "react";
import UserRegister from "./register/page.jsx";
import UserListMatrix from "./list/page.jsx";
import "./style.scss";

const UserPage = () => {
  return (
    <div className="page-container">
      <UserRegister />
      <UserListMatrix mode="read" />
    </div>
  );
};

export default UserPage;
