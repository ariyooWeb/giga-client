"use client";
import React from "react";
import { Form, Input, Button, Select } from "antd";
import "./style.scss";

const UserList = () => {
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const onFinish = () => {
    console.log("오오오오");
  };
  return (
    <div className="user-list-form">
      <h1>회원관리</h1>
      <Form onFinish={onFinish}>
        <div className="user-list-form-items">
          <Form.Item
            label="이름"
            name="name"
            rules={[{ required: true, message: "이름을 입력해주세요" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[{ required: true, message: "닉네임을 입력해주세요" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="성별"
            name="gender"
            rules={[{ required: true, message: "성별을 입력해주세요" }]}
          >
            <Select
              options={[
                { label: "남자", value: "M" },
                { label: "여자", value: "F" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="생년월일"
            name="birth"
            rules={[
              { required: true, message: "예)1990-11-30" },
              {
                pattern: birthRegex,
                message: "YYYY-MM-DD 형식으로 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="지역"
            name="local"
            rules={[{ required: true, message: "예)용인" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              등록
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UserList;
