import { DatePicker } from "antd";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  height: 40px !important;
  border: none !important;
  background: #dfe9ff !important;
  box-shadow:
    inset 5px 5px 5px #cbd4e8,
    inset -5px -5px 5px #f3feff;
  border-radius: 10px !important;

  .ant-picker-input > input {
    color: #69728a !important;

    &::placeholder {
      color: #69728a !important;
    }
  }

  .ant-picker-suffix {
    color: #69728a !important;
  }

  &.ant-picker-disabled {
    background: #dfe9ff !important;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff !important;
    border: none !important;
    height: 40px !important;
    border-radius: 10px !important;

    .ant-picker-input > input {
      color: #69728a !important;
    }

    .ant-picker-suffix {
      color: #69728a !important;
    }
  }

  &.ant-picker-focused {
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff !important;
    border: none !important;
    background: #dfe9ff !important;
    outline: none !important;
  }
`;

export default StyledDatePicker;
