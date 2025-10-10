"use client";
import "antd/dist/reset.css";
import "../styles/main.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "./Menu/Menu";

const items = [
  {
    label: "오픈팀 등록",
    key: "/openteam/register",
  },
  {
    label: "오픈팀 조회",
    key: "/openteam/list",
  },
  {
    label: "회원 등록",
    key: "/user/register",
  },
  {
    label: "회원 조회",
    key: "/user/list",
  },
];
const Header = () => {
  const router = useRouter();
  const [current, setCurrent] = useState();
  const onClick = (key) => {
    router.push(key);
    setCurrent(key);
  };
  const onClickLogo = () => {
    router.push("/");
    setCurrent("/");
  };

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, []);
  return (
    <div className="main-header">
      <div className="main-header-inner">
        <div className="main-header-left">
          <Image
            src="/logo.png"
            className="main-header-logo"
            width={40}
            height={0}
            style={{ height: "auto" }}
            alt="logo"
            onClick={onClickLogo}
          />
          <Menu items={items} onClick={onClick} current={current} />
        </div>
        <div className="main-header-info">
          <div className="main-header-info-login">로그아웃</div>
          <div className="main-header-info-user">유아름님 환영합니다!</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
