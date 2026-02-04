"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import "./style.scss"; // This will be empty for now, relying on parent styles
import StyledInput from "@/components/Input";
import StyledButton from "@/components/Button";

const SongRegister = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="common-form">
      <div className="common-form-title">
        <h1>곡 등록</h1>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <div className="common-form-items">
          <Form.Item
            label={<div className="common-form-label">가수</div>}
            name="singer"
            rules={[{ required: true, message: "가수 이름을 입력해주세요!" }]}
          >
            <StyledInput />
          </Form.Item>
          <Form.Item
            label={<div className="common-form-label">곡</div>}
            name="songTitle"
            rules={[{ required: true, message: "곡 제목을 입력해주세요!" }]}
          >
            <StyledInput />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" block>
              등록
            </StyledButton>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SongRegister;
