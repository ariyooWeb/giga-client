"use client";
import React from "react";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { setToken, setUsers } from "../../store/user"; // Import setUsers
import { loginApi, getUsersApi } from "../../tools/api"; // Import getUsersApi
import StyledInput from "@/components/Input";
import StyledButton from "@/components/Button";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values.loginId, values.password);
      console.log("뭐냐??", res);

      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);

      // Fetch users after successful login and set them in the store
      const usersRes = await getUsersApi();
      if (usersRes.status === "success") {
        dispatch(setUsers(usersRes.data.items));
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="page-container">
      <div className="common-form">
        <div className="common-form-title">
          <h1>Login</h1>
        </div>
        <Form onFinish={onFinish}>
          <div className="common-form-items">
            <Form.Item
              name="loginId"
              rules={[{ required: true, message: "아이디를 입력해주세요!" }]}
            >
              <StyledInput placeholder="아이디" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
            >
              <StyledInput.Password placeholder="비밀번호" />
            </Form.Item>
            <Form.Item>
              <StyledButton type="primary" htmlType="submit" block>
                Login
              </StyledButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
