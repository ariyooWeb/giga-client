"use client";
import React from "react";
import "./style.scss";
import { Tooltip } from "antd";

const dummySongs = [
  { songTitle: "사랑을 했다", singer: "iKON" },
  { songTitle: "Dynamite", singer: "BTS" },
  { songTitle: "Ditto", singer: "NewJeans" },
  { songTitle: "Hype Boy", singer: "NewJeans" },
  { songTitle: "사건의 지평선", singer: "윤하" },
  { songTitle: "Tomboy", singer: "(G)I-DLE" },
  { songTitle: "Antifragile", singer: "LE SSERAFIM" },
  { songTitle: "Attention", singer: "NewJeans" },
  { songTitle: "Kitsch", singer: "IVE" },
  { songTitle: "I AM", singer: "IVE" },
  { songTitle: "Love Dive", singer: "IVE" },
  { songTitle: "Next Level", singer: "aespa" },
];

const SongListMatrix = () => {
  return (
    <div className="common-form">
      <h1>곡 목록</h1>
      <div className="song-list-matrix-grid">
        {dummySongs.map((song, index) => (
          <div key={index} className="song-list-matrix-item">
            <Tooltip title={song.songTitle}>
              <div className="song-title">{song.songTitle}</div>
            </Tooltip>
            <Tooltip title={song.singer}>
              <div className="song-singer">{song.singer}</div>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongListMatrix;
