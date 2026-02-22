"use client";
import React, { useState } from "react";
import { Input, Select, Button, Alert } from "antd"; // Import Alert for displaying errors
import { useSongRegistration } from "./hooks/useSongRegistration";
import "./style.scss";
import StyledInput from "@/components/Input";
import StyledButton from "@/components/Button";

const { Option } = Select;

const SongRegisterPage = () => {
  const {
    singerNameInput,
    setSingerNameInput,
    songTitleInput,
    setSongTitleInput,
    singers,
    singersLoading,
    singersError,
    handleSingerNameInputChange,
    setSelectedSinger,
    selectedSinger,
    singerExists,
    songs,
    songsLoading,
    songsError,
    handleSongTitleInputChange,
    setSelectedSong,
    selectedSong,
    songExists,
    registerSong,
    registrationLoading,
    registrationError,
  } = useSongRegistration();

  const handleSingerSelect = (value) => {
    const selected = singers.find((s) => s.id === value);
    if (selected) {
      setSelectedSinger(selected);
      setSingerNameInput(selected.name_kor); // Update input field to selected singer's name
      // Trigger song search if a singer is selected and song title is already entered
      if (songTitleInput) {
        handleSongTitleInputChange(songTitleInput);
      }
    }
  };

  const handleSongSelect = (value) => {
    const selected = songs.find((s) => s.id === value);
    if (selected) {
      setSelectedSong(selected);
      setSongTitleInput(selected.song_name); // Update input field to selected song's name
    }
  };

  return (
    <div className="common-form">
      <div className="common-form-title">
        <h1>곡 등록</h1>
      </div>
      <div className="common-form-items">
        {registrationError && (
          <Alert message={registrationError} type="error" showIcon closable />
        )}

        <div className="form-item">
          <label className="common-form-label">가수</label>
          <StyledInput
            value={singerNameInput}
            onChange={(e) => handleSingerNameInputChange(e.target.value)}
            placeholder="가수 이름 입력"
          />
          {singersLoading && <div className="loading">가수 검색 중...</div>}
          {singersError && (
            <Alert message={singersError} type="error" showIcon />
          )}
          {singerNameInput.length > 0 &&
            singers.length > 0 && ( // Only show dropdown if input has value and there are search results
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="기존 가수 선택"
                optionFilterProp="children"
                onChange={handleSingerSelect}
                value={selectedSinger ? selectedSinger.id : undefined}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {singers.map((singer) => (
                  <Option key={singer.id} value={singer.id}>
                    {singer.name_kor}
                  </Option>
                ))}
              </Select>
            )}
        </div>
        <div className="form-item">
          <label className="common-form-label">곡</label>
          <StyledInput
            value={songTitleInput}
            onChange={(e) => handleSongTitleInputChange(e.target.value)}
            placeholder="곡 제목 입력"
            disabled={!selectedSinger && !singerNameInput} // Disable song input until a singer is selected/entered
          />
          {songsLoading && <div className="loading">곡 검색 중...</div>}
          {songsError && <Alert message={songsError} type="error" showIcon />}
          {songTitleInput.length > 0 &&
            songs.length > 0 &&
            selectedSinger && ( // Only show dropdown if input has value, singer is selected and there are search results
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="기존 곡 선택"
                optionFilterProp="children"
                onChange={handleSongSelect}
                value={selectedSong ? selectedSong.id : undefined}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {songs.map((song) => (
                  <Option key={song.id} value={song.id}>
                    {song.song_name}
                  </Option>
                ))}
              </Select>
            )}
        </div>
        <StyledButton type="primary" onClick={registerSong} block>
          {registrationLoading ? "등록 중..." : "등록"}
        </StyledButton>
      </div>
    </div>
  );
};

export default SongRegisterPage;
