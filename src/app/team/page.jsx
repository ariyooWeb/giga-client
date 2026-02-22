"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import TeamListPage from "./list/page";
import TeamRegister from "./register/page";
import UserListMatrix from "../user/list/page";
import teamData from "./list/data";
// import namesExample from "../user/list/data"; // Remove this import
import "./style.scss";

const TeamPage = () => {
  const [current, setCurrent] = useState("list");
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // State now holds IDs
  const [formMode, setFormMode] = useState("register"); // New state for form mode, default to 'register' for new entry

  const allUsers = useSelector((state) => state.user.users); // Get all users from Redux store

  const handleViewChange = (view, initialSelectedUserIds = []) => {
    setCurrent(view); // Update the 'current' state
    // When switching from list to form, determine the initial formMode
    if (view === "form") {
      setFormMode(selectedValue === null ? "register" : "view");
      setSelectedUserIds(initialSelectedUserIds); // Use the directly passed IDs
    } else if (view === "list") {
      // When going back to the list view, clear all selections
      setSelectedUserIds([]);
      setSelectedValue(null);
    }
    // The "participant_registration" view is not used for this "team" flow,
    // so its original handling is not needed here.
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
    selectedValue !== null ? teamData[selectedValue] : null;

  // Derive the full user objects from the IDs
  const selectedUsers = allUsers.filter((user) => // Use allUsers instead of namesExample
    selectedUserIds.includes(user.id),
  );

  return (
    <div className="page-container">
      {current === "list" && (
        <TeamListPage
          onViewChange={handleViewChange} // Renamed prop
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setFormMode={setFormMode} // Pass setFormMode to list page
        />
      )}
      {current === "form" && (
        <div className="participant-registration-container">
          <TeamRegister
            setCurrent={handleViewChange} // Still needs to be named setCurrent for TeamRegister to recognize the prop
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

export default TeamPage;