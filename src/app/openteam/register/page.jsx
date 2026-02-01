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
import dayjs from "dayjs";
import "./style.scss";

const OpenteamRegister = ({
  setCurrent,
  team,
  selectedUsers = [],
  onUserRemove = () => {},
}) => {
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
    if (team) {
      form.setFieldsValue({
        date: dayjs(team.date),
        leader: team.leader,
        // Assuming song name can be matched to an ID. This might need more robust logic.
        // For now, we leave it blank as we don't have a direct mapping.
      });
    }
  }, [team, form]);

  const onFinish = () => {
    console.log("오오오오");
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

  // New handleUserSearch for the "진행자" AutoComplete
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

  return (
    <div className="openteam-register-wrapper">
      <button className="back-button" onClick={() => setCurrent("list")}>
        &#x2190;
      </button>
      <div className="common-form">
        <h1>오픈팀 등록/수정</h1>
        <Form onFinish={onFinish} form={form}>
          <div className="common-form-items">
            <Form.Item
              label="날짜"
              name="date"
              rules={[{ required: true, message: "날짜" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="가수" name="singer" rules={[{ required: true }]}>
              <AutoComplete
                options={filteredSingers}
                onSearch={handleSearch}
                onSelect={onSelectSinger}
              />
            </Form.Item>
            <Form.Item label="곡" name="song" rules={[{ required: true }]}>
              <Select
                options={selectedSingerSongs.map((song) => ({
                  value: song.id,
                  label: song.name,
                }))}
                disabled={selectedSingerSongs.length === 0}
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
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                저장
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className="selected-users-grid">
          <h3>참가자 목록</h3>
          <div className="user-list-matrix-grid">
            {selectedUsers.map((user, index) => (
              <div
                key={index}
                className="user-list-matrix-item selected"
                onClick={() => onUserRemove(user.id)}
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenteamRegister;
