import React from "react";
import "./style.scss";

const OpenteamListPage = () => {
  const openteamList = [
    { date: "2026-01-13", leader: "유아름", song: "walking down the street" },
    { date: "2026-01-20", leader: "김동현", song: "words" },
  ];

  return (
    <div className="openteam-list-page">
      <div className="openteam-list-page-container">
        <h1>오픈팀 리스트</h1>
        <ul>
          {openteamList.map((item, index) => (
            <li key={index}>
              <span>날짜: {item.date}</span>
              <span>리더: {item.leader}</span>
              <span>곡: {item.song}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OpenteamListPage;
