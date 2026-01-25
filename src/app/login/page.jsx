"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/user";
import { loginApi } from "../../tools/api";
import "./style.scss";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await loginApi(values.loginId, values.password);
      console.log("뭐냐??", res);

      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-form">
        <h1>Login</h1>
        <Form onFinish={onFinish}>
          <div className="login-page-form-items">
            <Form.Item
              label="아이디"
              name="loginId"
              rules={[{ required: true, message: "아이디를 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
