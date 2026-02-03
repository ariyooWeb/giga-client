"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import StyledInput from "@/components/Input/index";
import StyledSelect from "@/components/Select/index";
import StyledCheckbox from "@/components/Checkbox";
import StyledButton from "@/components/Button";
import "./style.scss";

const UserRegister = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const onFinish = () => {
    console.log("오오오오");
  };
  return (
    <div className="common-form">
      <div className="common-form-title">
        <h1>회원관리</h1>
      </div>
      <Form onFinish={onFinish}>
        <div className="common-form-items">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "이름을 입력해주세요" }]}
          >
            <StyledInput placeholder="이름" />
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: "닉네임을 입력해주세요" }]}
          >
            <StyledInput placeholder="닉네임" />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: "성별을 입력해주세요" }]}
          >
            <StyledSelect
              placeholder="성별"
              options={[
                { label: "남자", value: "M" },
                { label: "여자", value: "F" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="birth"
            rules={[
              { required: true, message: "예)1990-11-30" },
              {
                pattern: birthRegex,
                message: "YYYY-MM-DD 형식으로 입력해주세요.",
              },
            ]}
          >
            <StyledInput
              placeholder="생년월일 (1990-11-30)"
              autoComplete="new-password"
              name={Math.random().toString(36).substring(2)}
            />
          </Form.Item>
          <Form.Item
            name="local"
            rules={[{ required: true, message: "예)용인" }]}
          >
            <StyledInput placeholder="지역" />
          </Form.Item>
          <Form.Item name="part" rules={[{ required: true, message: "파트" }]}>
            <StyledInput placeholder="메인파트" />
          </Form.Item>
          <Form.Item name="isAdmin" rules={[{ required: false }]}>
            <div
              style={{
                display: "flex",
                gap: 10,
                color: "#69728a",
                alignItems: "center",
              }}
            >
              <div>운영진</div>
              <StyledCheckbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
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

export default UserRegister;
