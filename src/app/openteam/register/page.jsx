import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  DatePicker,
  AutoComplete,
} from "antd";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons"; // Import EditOutlined icon and UnorderedListOutlined
import dayjs from "dayjs";
import "./style.scss";

const OpenteamRegister = ({
  setCurrent,
  team,
  selectedUsers = [],
  onUserRemove = () => {},
  formMode, // new prop
  setFormMode, // new prop
}) => {
  const [mode, setMode] = useState(formMode); // Internal state for 'view', 'edit', 'register'
  const singerData = [
    {
      id: 5,
      nameEng: "MayTree",
      nameKor: "메이트리",
      region: "대한민국",
      songs: [
        {
          id: 11,
          name: "Dolls",
        },
      ],
    },
    {
      id: 6,
      nameEng: "TheRealGroup",
      nameKor: "리얼그룹",
      region: "스웨덴",
      songs: [
        {
          id: 9,
          name: "Words",
        },
        {
          id: 10,
          name: "I Sing, You Sing",
        },
      ],
    },
  ];

  const users = [
    "유아름",
    "김동현",
    "방원택",
    "최효철",
    "김미사",
    "이형원",
    "탁현정",
    "전민아",
  ];
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const [filteredSingers, setFilteredSingers] = useState(
    singerData.map((s) => ({ value: s.nameKor, id: s.id })),
  );
  const [selectedSingerSongs, setSelectedSingerSongs] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(
    users.map((user) => ({ value: user })),
  ); // New state for users
  const [form] = Form.useForm();

  useEffect(() => {
    setMode(formMode); // Update internal mode when prop changes
    if (team) {
      form.setFieldsValue({
        date: dayjs(team.date),
        leader: team.leader,
        singer: team.singer, // Set singer value
      });

      // Manually trigger the song list population based on team.singer
      const selectedSinger = singerData.find((s) => s.nameKor === team.singer);
      if (selectedSinger) {
        setSelectedSingerSongs(selectedSinger.songs);
        // Find the song ID based on the song name from the team object
        const songId = selectedSinger.songs.find(
          (s) => s.name === team.song,
        )?.id;
        form.setFieldsValue({ song: songId }); // Set song value (ID)
      } else {
        setSelectedSingerSongs([]);
        form.setFieldsValue({ song: undefined });
      }
    } else {
      form.resetFields(); // Reset form fields if no team (new registration)
      setSelectedSingerSongs([]); // Clear song options
    }
  }, [team, form, formMode, singerData]); // Add singerData to dependency array

  const onFinish = () => {
    console.log("오오오오");
    setMode("view"); // After saving, go back to view mode
    setFormMode("view"); // Also update the parent's formMode to 'view'
  };

  const handleSearch = (value) => {
    if (value) {
      const filtered = singerData
        .filter((s) => s.nameKor.toLowerCase().includes(value.toLowerCase()))
        .map((s) => ({ value: s.nameKor, id: s.id }));
      setFilteredSingers(filtered);
    } else {
      setFilteredSingers(
        singerData.map((s) => ({ value: s.nameKor, id: s.id })),
      );
    }
  };

  const handleUserSearch = (value) => {
    if (value) {
      const filtered = users
        .filter((user) => user.toLowerCase().includes(value.toLowerCase()))
        .map((user) => ({ value: user }));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users.map((user) => ({ value: user })));
    }
  };

  const onSelectSinger = (value, option) => {
    const singer = singerData.find((s) => s.nameKor === value);
    if (singer) {
      setSelectedSingerSongs(singer.songs);
      form.setFieldsValue({ song: undefined });
    } else {
      setSelectedSingerSongs([]);
    }
  };

  const handleEditClick = () => {
    setMode("edit");
    setFormMode("edit"); // Also update the parent's formMode to 'edit'
  };

  const isViewMode = mode === "view";
  const titleText =
    mode === "register"
      ? "오픈팀 등록"
      : mode === "edit"
        ? "오픈팀 수정"
        : "오픈팀 정보"; // Assuming "오픈팀 정보" for view mode

  return (
    <div className="openteam-register-wrapper">
      <div className="top-buttons-container">
        {" "}
        {/* New container for buttons */}
        <button className="back-button" onClick={() => setCurrent("list")}>
          <UnorderedListOutlined /> {/* Changed icon here */}
        </button>
        {isViewMode && (
          <button className="edit-button" onClick={handleEditClick}>
            {" "}
            {/* Changed to plain button */}
            <EditOutlined /> {/* Removed "수정" text */}
          </button>
        )}
      </div>
      <div className="common-form">
        <h1>{titleText}</h1>
        <Form onFinish={onFinish} form={form}>
          <div className="common-form-items">
            <Form.Item
              label="날짜"
              name="date"
              rules={[{ required: true, message: "날짜" }]}
            >
              <DatePicker style={{ width: "100%" }} disabled={isViewMode} />
            </Form.Item>
            <Form.Item label="가수" name="singer" rules={[{ required: true }]}>
              <AutoComplete
                options={filteredSingers}
                onSearch={handleSearch}
                onSelect={onSelectSinger}
                disabled={isViewMode}
              />
            </Form.Item>
            <Form.Item label="곡" name="song" rules={[{ required: true }]}>
              <Select
                options={selectedSingerSongs.map((song) => ({
                  value: song.id,
                  label: song.name,
                }))}
                disabled={selectedSingerSongs.length === 0 || isViewMode}
              />
            </Form.Item>
            <Form.Item
              label="진행자"
              name="leader"
              rules={[{ required: true }]}
            >
              <AutoComplete
                options={filteredUsers}
                onSearch={handleUserSearch}
                disabled={isViewMode}
              />
            </Form.Item>
            <Form.Item
              label="참가자 목록"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <div className={`selected-users-grid ${isViewMode ? 'view-mode-disabled-grid' : ''}`}>
                <div className={`user-list-matrix-grid ${selectedUsers.length === 0 ? 'empty-list' : ''}`}>
                  {selectedUsers.length === 0 ? (
                    <div className="empty-message">참가자를 선택해 주세요</div>
                  ) : (
                    selectedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="user-list-matrix-item selected"
                        onClick={() =>
                          isViewMode ? null : onUserRemove(user.id)
                        } // Disable remove in view mode
                        style={{ cursor: isViewMode ? "default" : "pointer" }}
                      >
                        {user.name}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Form.Item>
            {!isViewMode && ( // Only show save button if not in view mode
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  저장
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OpenteamRegister;
