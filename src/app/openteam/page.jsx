"use client";
import React, { useState } from "react";
import OpenteamListPage from "./list/page";
import OpenteamRegister from "./register/page";
import UserListMatrix from "../user/list/page";
import openteamData from "./list/data";
import "./style.scss";

import namesExample from "../user/list/data"; // Import the full user data

const OpenteamPage = () => {
  const [current, setCurrent] = useState("list");
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // State now holds IDs
  const [formMode, setFormMode] = useState("register"); // New state for form mode, default to 'register' for new entry

  const handleSetCurrent = (view) => {
    setCurrent(view);
    if (view !== "participant_registration") {
      setSelectedUserIds([]); // Reset selected user IDs
    }
    // When switching from list to form, determine the initial formMode
    if (view === "form") {
      setFormMode(selectedValue === null ? "register" : "view");
    }
  };

  // Handler now works with user IDs
  const handleUserSelect = (userId) => {
    setSelectedUserIds((prevIds) => {
      if (prevIds.includes(userId)) {
        return prevIds.filter((id) => id !== userId);
      } else {
        return [...prevIds, userId];
      }
    });
  };

  const editingTeam =
    selectedValue !== null ? openteamData[selectedValue] : null;

  // Derive the full user objects from the IDs
  const selectedUsers = namesExample.filter((user) =>
    selectedUserIds.includes(user.id),
  );

  return (
    <div className="page-container">
      {current === "list" && (
        <OpenteamListPage
          setCurrent={handleSetCurrent}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setFormMode={setFormMode} // Pass setFormMode to list page
        />
      )}
      {current === "form" && (
        <div className="participant-registration-container">
          <OpenteamRegister
            setCurrent={handleSetCurrent}
            team={editingTeam}
            selectedUsers={selectedUsers} // Pass the array of objects
            onUserRemove={handleUserSelect} // The handler still works with IDs
            formMode={formMode} // Pass formMode to register page
            setFormMode={setFormMode} // Pass setFormMode to register page
          />
          <UserListMatrix
            selectedUserIds={selectedUserIds} // Pass the array of IDs
            onUserSelect={handleUserSelect}
            disabled={formMode === "view"} // Disable UserListMatrix in view mode
          />
        </div>
      )}
    </div>
  );
};

export default OpenteamPage;
