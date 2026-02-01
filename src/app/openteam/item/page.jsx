import { Tooltip } from "antd";

const OpenteamItem = ({ selectedUsers }) => {
  console.log("selectedUsers???", selectedUsers);
  return (
    <div className="common-form">
      <div className="openteam-meta">
        <div>2026-11-11</div>
        <div>유아름</div>
        <div>Walking down the street</div>
      </div>
      <div className="user-list-matrix-grid">
        {Array.from(selectedUsers).map((user, index) => (
          <div key={index} className="user-list-matrix-item">
            <Tooltip title={user.nickname}>
              <span>{user.name}</span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenteamItem;
