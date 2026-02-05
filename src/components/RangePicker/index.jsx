import { DatePicker } from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const StyledRangePicker = styled(RangePicker)`
  height: 40px;
  border: none;
  background: #dfe9ff;
  box-shadow:
    inset 5px 5px 5px #cbd4e8,
    inset -5px -5px 5px #f3feff;
  color: #69728a;
  border-radius: 10px;
  max-width: 100% !important;
  /* Maintain neumorphic style on hover */
  &:hover {
    border: none;
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
  }
  /* Maintain neumorphic style when focused (calendar open) */
  &:focus,
  &.ant-picker-focused {
    /* ant-picker-focused class is often added when the picker is open */
    height: 40px;
    border: none;
    background: #dfe9ff;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
    color: #69728a;
    border-radius: 10px;
  }
  /* Maintain neumorphic style when disabled */
  &.ant-picker-disabled {
    height: 40px;
    border: none;
    background: #e0e0e0; /* Slightly different background for disabled state */
    box-shadow:
      inset 3px 3px 3px #bebebe,
      inset -3px -3px 3px #ffffff;
    color: #a0a0a0; /* Lighter color for text in disabled state */
    border-radius: 10px;
    cursor: not-allowed;
  }
  transition: none !important;

  .ant-picker-input > input {
    color: #69728a;
  }
  &.ant-picker-disabled .ant-picker-input > input {
    color: #a0a0a0;
  }

  .ant-picker-separator {
    color: #69728a;
  }
  &.ant-picker-disabled .ant-picker-separator {
    color: #a0a0a0;
  }

  .ant-picker-clear {
    background: #dfe9ff;
  }
`;

export default StyledRangePicker;
