import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./style.scss";
import namesExample from "../../user/list/data"; // For getting user names from IDs
import StyledButton from "@/components/Button";
import StyledInput from "@/components/Input";

const TeamRegister = ({
  setCurrent,
  team,
  selectedUsers = [],
  onUserRemove = () => {},
  formMode,
  setFormMode,
}) => {
  const [mode, setMode] = useState(formMode); // Internal state for 'view', 'edit', 'register'
  const [form] = Form.useForm();

  useEffect(() => {
    setMode(formMode); // Update internal mode when prop changes
    if (team) {
      form.setFieldsValue({
        team: team.team,
        // usersIds are managed by selectedUsers prop, not directly in form
      });
    } else {
      form.resetFields(); // Reset form fields if no team (new registration)
    }
  }, [team, form, formMode]);

  const onFinish = () => {
    console.log("팀 저장");
    setMode("view"); // After saving, go back to view mode
    setFormMode("view"); // Also update the parent's formMode to 'view'
  };

  const handleEditClick = () => {
    setMode("edit");
    setFormMode("edit"); // Also update the parent's formMode to 'edit'
  };

  const isViewMode = mode === "view";
  const titleText =
    mode === "register" ? "팀 등록" : mode === "edit" ? "팀 수정" : "팀 정보"; // Assuming "팀 정보" for view mode

  return (
    <div className="team-register-wrapper">
      {/* <div className="top-buttons-container">
        <button className="back-button" onClick={() => setCurrent("list")}>
          <UnorderedListOutlined />
        </button>
      </div> */}
      <div className="common-form">
        <div className="common-form-title">
          <button
            className="common-button left"
            onClick={() => setCurrent("list")}
          >
            <UnorderedListOutlined />
          </button>
          <h1>{titleText}</h1>
          {isViewMode && (
            <button className="common-button right" onClick={handleEditClick}>
              <EditOutlined />
            </button>
          )}
        </div>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <div className="common-form-items">
            <Form.Item
              label={<div className="common-form-label">팀 이름</div>}
              name="team"
              rules={[{ required: true, message: "팀 이름을 입력해주세요!" }]}
            >
              <StyledInput disabled={isViewMode} />
            </Form.Item>
            <Form.Item
              label={<div className="common-form-label">팀원 목록</div>}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <div
                className={`selected-users-box ${selectedUsers.length === 0 ? "empty-list" : ""}`}
              >
                {selectedUsers.length === 0 ? (
                  <div className="empty-message">팀원을 선택해 주세요</div>
                ) : (
                  <div>{selectedUsers.map((user) => user.name).join(", ")}</div>
                )}
              </div>
            </Form.Item>
            {!isViewMode && (
              <Form.Item>
                <StyledButton type="primary" htmlType="submit" block>
                  저장
                </StyledButton>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TeamRegister;
