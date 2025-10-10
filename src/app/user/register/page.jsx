"use client";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, AutoComplete, Select } from "antd";
import "./style.scss";
import { SmileOutlined } from "@ant-design/icons";

const register = () => {
  return (
    <div className="user-reg-page">
      <Form>
        <div className="user-reg-page-greeting">
          기가히츠에 오신것을 환영합니다&nbsp;
          <SmileOutlined />
        </div>
        <Form.Item label="이름">
          <Input />
        </Form.Item>
        <Form.Item label="성별">
          <Select />
        </Form.Item>
        <Form.Item label="파트">
          <Select />
        </Form.Item>
        <Form.Item label="닉네임">
          <Input />
        </Form.Item>
        <Form.Item label="휴대폰">
          <Input />
        </Form.Item>
        <Form.Item label="생년월일">
          <Input />
        </Form.Item>
        <Form.Item label="지역">
          <Input />
        </Form.Item>
        <Button type="primary" block>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default register;
