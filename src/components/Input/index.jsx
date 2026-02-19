import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)`
  height: 40px;
  border: none;
  background: #dfe9ff;
  box-shadow:
    inset 5px 5px 5px #cbd4e8,
    inset -5px -5px 5px #f3feff;
  color: #69728a;
  border-radius: 10px;
  &:focus {
    height: 40px;
    border: none;
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
    color: #69728a;
    border-radius: 10px;
    outline: none !important; /* Ensure no outline on focus */
    border-color: transparent !important; /* Ensure no border on focus */
  }
  /* Maintain neumorphic style when disabled */
  &.ant-input-disabled {
    height: 40px;
    border: none;
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
    color: #69728a;
    border-radius: 10px;
  }
  transition: none !important;
`;

const StyledInputPassword = styled(Input.Password)`
  height: 40px;
  border: none;
  background: #dfe9ff;
  box-shadow:
    inset 5px 5px 5px #cbd4e8,
    inset -5px -5px 5px #f3feff;
  color: #69728a;
  border-radius: 10px;
  transition: none !important;

  &:hover {
    height: 40px;
    border: none;
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
    color: #69728a;
    border-radius: 10px;
  }
  /* Target the input element inside the password component */
  .ant-input {
    background: #dfe9ff; /* Ensure background is neumorphic */

    &:hover {
      background: none !important;
    }
  }

  /* Fix for focus styles on the wrapper */
  &.ant-input-affix-wrapper-focused {
    background: #dfe9ff !important;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff !important; /* Remove default Ant Design focus shadow */
    border-color: transparent !important; /* Remove default Ant Design focus border */
    outline: none !important; /* Remove default outline */
  }

  /* Fix for focus styles on the actual input element */
  &.ant-input-affix-wrapper-focused .ant-input,
  .ant-input:focus {
    /* Also target direct input focus */
    background: none !important; /* Keep neumorphic background */
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff !important; /* Maintain neumorphic box-shadow */
    border-color: transparent !important; /* Remove blue border */
    outline: none !important; /* Remove blue outline */
  }

  /* Maintain neumorphic style when disabled for the input element */
  &.ant-input-affix-wrapper-disabled .ant-input {
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
  }
`;

StyledInput.Password = StyledInputPassword;

export default StyledInput;
