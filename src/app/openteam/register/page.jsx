"use client";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, AutoComplete } from "antd";
import "./style.scss";
import dynamic from "next/dynamic";
const Dnd = dynamic(() => import("../../../components/DND/Dnd"), {
  ssr: false,
});

const register = () => {
  const users = [
    { value: "유아름(90)", label: "유아름1", id: 1 },
    { value: "유아름(92)", label: "유아름2", id: 2 },
    { value: "방원택(94)", label: "방원택", id: 3 },
  ];

  const singers = [
    { value: "리얼그룹", label: "리얼그룹", id: 1 },
    { value: "The Idea Of North", label: "The Idea Of North", id: 2 },
    { value: "Pentatonix", label: "Pentatonix", id: 3 },
  ];

  return (
    <div className="openteam-reg-page">
      <div className="openteam-reg-page-form">
        <Form>
          <div className="openteam-reg-page-form-items">
            <div className="openteam-reg-page-form-items-inputs">
              <Form.Item label="날짜" style={{ width: 200 }}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="진행자" style={{ width: 200 }}>
                <AutoComplete options={users} />
              </Form.Item>
              <Form.Item label="가수명" style={{ width: 200 }}>
                <AutoComplete options={singers} />
              </Form.Item>
              <Form.Item label="곡명" style={{ width: 200 }}>
                <Input />
              </Form.Item>
            </div>
            <Button type="primary">Save</Button>
          </div>
        </Form>
      </div>
      <Dnd />
    </div>
  );
};

export default register;
