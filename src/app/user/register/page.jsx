"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import StyledInput from "@/components/Input/index";
import StyledSelect from "@/components/Select/index";
import StyledCheckbox from "@/components/Checkbox";
import StyledButton from "@/components/Button";
import { registerUserApi } from "@/tools/api";
import { useDispatch } from "react-redux";
import { triggerUserListRefresh } from "@/store/user";
import "./style.scss";

const UserRegister = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Get form instance

  const onFinish = async (values) => {
    try {
      // part_id는 현재 텍스트 인풋으로 받고 있지만, API는 UUID를 기대합니다.
      // 실제 구현에서는 part 이름을 기반으로 part_id를 조회하거나,
      // 드롭다운 등으로 part_id를 직접 선택하도록 해야 합니다.
      const userData = {
        name: values.name,
        phone: "010-1234-1234",
        nickname: values.nickname,
        gender: values.gender,
        birth: values.birth,
        is_admin: isAdmin, // isAdmin state from checkbox
        local: values.local,
        // 임시 part_id. 실제 구현에서는 동적으로 가져와야 합니다.
        part_id: Number(values.part),
      };

      const response = await registerUserApi(userData);
      message.success("회원 등록 성공!");
      console.log("User registered successfully:", response);
      form.resetFields(); // Clear form fields
      // Optionally reset isAdmin if it's not managed by form.resetFields
      setIsAdmin(false); 
      dispatch(triggerUserListRefresh()); // Trigger refresh of user list
    } catch (error) {
      message.error(error.message || "회원 등록 실패.");
      console.error("User registration failed:", error);
    }
  };
  return (
    <div className="common-form">
      <div className="common-form-title">
        <h1>회원관리</h1>
      </div>
      <Form form={form} onFinish={onFinish}>
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
            />
          </Form.Item>
          <Form.Item
            name="local"
            rules={[{ required: true, message: "예)용인" }]}
          >
            <StyledInput placeholder="지역" />
          </Form.Item>
          <Form.Item name="part" rules={[{ required: true, message: "파트" }]}>
            <StyledSelect
              placeholder="메인파트"
              options={[
                { label: "소프라노", value: 2 },
                { label: "알토", value: 4 },
                { label: "테너", value: 5 },
                { label: "바리톤", value: 1 },
                { label: "베이스", value: 6 },
                { label: "보컬퍼커션", value: 7 },
              ]}
            />
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
