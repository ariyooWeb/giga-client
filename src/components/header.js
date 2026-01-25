"use client";
import "antd/dist/reset.css";
import "../styles/main.scss";
import "../styles/common.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Menu from "./Menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/user";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Get token from Redux store
  // const [current, setCurrent] = useState();
  const pathname = usePathname();

  const onClick = (key) => {
    router.push(key);
    // setCurrent(key);
  };
  const onClickLogo = () => {
    router.push("/");
    // setCurrent("/");
  };

  const handleLogout = () => {
    dispatch(clearToken());
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    console.log("pathname확인하기", pathname);
  }, [pathname]);

  // useEffect(() => {
  //   setCurrent(window.location.pathname);
  // }, []);

  // Menu items without conditional login item
  const menuItems = [
    {
      label: "회원 관리",
      key: "/user",
    },
    {
      label: "가수, 곡 등록",
      key: "/song",
    },
    {
      label: "오픈팀 등록",
      key: "/openteam",
    },
    {
      label: "팀 등록",
      key: "/team",
    },
    {
      label: "참석률 조회",
      key: "/count",
    },
  ];

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
          <Menu items={menuItems} onClick={onClick} current={pathname} />
        </div>
        <div className="main-header-info">
          {token ? (
            <>
              <div className="main-header-info-login" onClick={handleLogout}>
                로그아웃
              </div>
            </>
          ) : (
            <div className="main-header-info-login" onClick={handleLogin}>
              로그인
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
