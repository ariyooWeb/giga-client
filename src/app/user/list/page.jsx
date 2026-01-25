"use client";
import React from "react";
import "./style.scss";

const namesExample = [
  "유아름",
  "김동현",
  "방원택",
  "최효철",
  "김미사",
  "이형원",
  "탁현정",
  "전민아",
  "박현서",
  "김현화",
  "최재원",
  "박소다",
  "최혜은",
  "김태현",
  "이종성",
  "백이화",
  "박한마로",
  "유아름",
  "김동현",
  "방원택",
  "최효철",
  "김미사",
  "이형원",
  "탁현정",
  "전민아",
  "박현서",
  "김현화",
  "최재원",
  "박소다",
  "최혜은",
  "김태현",
  "이종성",
  "백이화",
  "박한마로",
  "유아름",
  "김동현",
  "방원택",
  "최효철",
  "김미사",
  "이형원",
  "탁현정",
  "전민아",
  "박현서",
  "김현화",
  "최재원",
  "박소다",
  "최혜은",
  "김태현",
  "이종성",
  "백이화",
  "박한마로",
];

const UserListMatrix = () => {
  return (
    <div className="user-list-matrix">
      <h1>회원목록</h1>
      <div className="user-list-matrix-grid">
        {namesExample.map((user, index) => (
          <div key={index} className="user-list-matrix-item">
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListMatrix;
