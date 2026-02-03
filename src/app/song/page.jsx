"use client";
import React from "react";
import SongRegister from "./register/page.jsx";
import SongListMatrix from "./list/page.jsx";
import "./style.scss";

const SongPage = () => {
  return (
    <div className="page-container">
      <SongRegister />
      <SongListMatrix />
    </div>
  );
};

export default SongPage;
