"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import "./style.scss"; // This will be empty for now, relying on parent styles

const SongRegister = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="common-form">
      {" "}
      {/* Using common-form for consistent styling */}
      <h1>곡 등록</h1>
      <Form onFinish={onFinish}>
        <div className="common-form-items">
          <Form.Item
            label="가수"
            name="singer"
            rules={[{ required: true, message: "가수 이름을 입력해주세요!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="곡"
            name="songTitle"
            rules={[{ required: true, message: "곡 제목을 입력해주세요!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              등록
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SongRegister;
