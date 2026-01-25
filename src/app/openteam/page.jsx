"use client";
import React, { useState } from "react";
import OpenteamListPage from "./list/page";
import OpenteamRegister from "./register/page";

const OpenteamPage = () => {
  const [current, setCurrent] = useState("list");
  return (
    <div className="page-container">
      {current === "list" && <OpenteamListPage setCurrent={setCurrent} />}
      {current === "form" && <OpenteamRegister />}
    </div>
  );
};

export default OpenteamPage;
