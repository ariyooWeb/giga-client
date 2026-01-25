"use client";
import React from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import "./style.scss";

const UserRegister = () => {
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const onFinish = () => {
    console.log("오오오오");
  };
  return (
    <div className="user-form">
      <h1>회원관리</h1>
      <Form onFinish={onFinish}>
        <div className="user-form-items">
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
          <Form.Item
            label="메인파트"
            name="part"
            rules={[{ required: true, message: "파트" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="운영진"
            name="isAdmin"
            rules={[{ required: false }]}
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="등록 날짜"
            name="registrationDate"
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #eee",
            }}
          >
            <Input
              readOnly
              variant="borderless"
              initialValue="2023-01-01 10:00:00"
            />
          </Form.Item>
          <Form.Item label="업데이트 날짜" name="updateDate">
            <Input
              readOnly
              variant="borderless"
              initialValue="2023-01-01 12:30:00"
            />
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

export default UserRegister;
