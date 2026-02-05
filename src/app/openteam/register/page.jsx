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
import StyledAutoComplete from "@/components/AutoComplete";
import StyledSelect from "@/components/Select";
import StyledButton from "@/components/Button";
import StyledDatePicker from "@/components/DatePicker";

// Move constant data outside the component to prevent re-creation on render and fix infinite loop.
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

const OpenteamRegister = ({
  setCurrent,
  team,
  selectedUsers = [],
  onUserRemove = () => {},
  formMode, // new prop
  setFormMode, // new prop
}) => {
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const [filteredSingers, setFilteredSingers] = useState(
    singerData.map((s) => ({ value: s.nameKor, id: s.id })),
  );
  const [selectedSingerSongs, setSelectedSingerSongs] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(
    users.map((user) => ({ value: user })),
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (team) {
      form.setFieldsValue({
        date: dayjs(team.date),
        leader: team.leader,
        singer: team.singer,
      });

      const selectedSinger = singerData.find((s) => s.nameKor === team.singer);
      if (selectedSinger) {
        setSelectedSingerSongs(selectedSinger.songs);
        const songId = selectedSinger.songs.find(
          (s) => s.name === team.song,
        )?.id;
        form.setFieldsValue({ song: songId });
      } else {
        setSelectedSingerSongs([]);
        form.setFieldsValue({ song: undefined });
      }
    } else {
      form.resetFields();
      setSelectedSingerSongs([]);
    }
  }, [team, form, formMode]);

  const onFinish = () => {
    console.log("오오오오");
    setFormMode("view");
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
    setFormMode("edit");
  };

  const isViewMode = formMode === "view";
  const titleText =
    formMode === "register"
      ? "오픈팀 등록"
      : formMode === "edit"
        ? "오픈팀 수정"
        : "오픈팀 정보";

  return (
    <div className="openteam-register-wrapper">
      <div className="common-form">
        <div className="common-form-title">
          <button
            className="common-button left"
            onClick={() => setCurrent("list")}
          >
            <UnorderedListOutlined />
          </button>
          <h1>{titleText}</h1>
          {isViewMode && (
            <button className="common-button right" onClick={handleEditClick}>
              <EditOutlined />
            </button>
          )}
        </div>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <div className="common-form-items">
            <Form.Item
              label={<div className="common-form-label">날짜</div>}
              name="date"
              rules={[{ required: true, message: "날짜는 필수 입력입니다." }]}
            >
              <StyledDatePicker
                style={{ width: "100%" }}
                disabled={isViewMode}
              />
            </Form.Item>
            <Form.Item
              label={<div className="common-form-label">가수</div>}
              name="singer"
              rules={[{ required: true }]}
            >
              <StyledAutoComplete
                options={filteredSingers}
                onSearch={handleSearch}
                onSelect={onSelectSinger}
                disabled={isViewMode}
              />
            </Form.Item>
            <Form.Item
              label={<div className="common-form-label">곡</div>}
              name="song"
              rules={[{ required: true }]}
            >
              <StyledSelect
                options={selectedSingerSongs.map((song) => ({
                  value: song.id,
                  label: song.name,
                }))}
                disabled={selectedSingerSongs.length === 0 || isViewMode}
              />
            </Form.Item>
            <Form.Item
              label={<div className="common-form-label">진행자</div>}
              name="leader"
              rules={[{ required: true }]}
            >
              <StyledAutoComplete
                key={team?.leader}
                options={filteredUsers}
                onSearch={handleUserSearch}
                disabled={isViewMode}
              />
            </Form.Item>
            <Form.Item
              label={
                <div className="common-form-label">
                  참가자 목록 {`(${selectedUsers.length})`}
                </div>
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <div
                className={`selected-users-box ${selectedUsers.length === 0 ? "empty-list" : ""}`}
              >
                {selectedUsers.length === 0 ? (
                  <div className="empty-message">참가자를 선택해 주세요</div>
                ) : (
                  <div>{selectedUsers.map((user) => user.name).join(", ")}</div>
                )}
              </div>
            </Form.Item>
            {!isViewMode && (
              <Form.Item>
                <StyledButton type="primary" htmlType="submit" block>
                  저장
                </StyledButton>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OpenteamRegister;
