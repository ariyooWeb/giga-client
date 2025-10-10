import "./styles.scss";
import React, { useState } from "react";

const Menu = ({ items, onClick, current }) => {
  const onClickMenu = (key) => {
    onClick(key);
  };
  return (
    <div className="menus">
      {items?.map((item, index) => (
        <div
          className={item.key === current ? "menus-menu active" : "menus-menu"}
          key={index}
          onClick={() => onClickMenu(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Menu;
