import { Checkbox } from "antd";
import styled from "styled-components";

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox {
    width: 25px;
    height: 25px;
  }
  .ant-checkbox-inner {
    width: 25px;
    height: 25px;
    border: none !important;
    background: #dfe9ff !important;
    box-shadow:
      inset 3px 3px 7px #bebebe,
      inset -3px -3px 7px #ffffff !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #69728a !important;
    left: 28% !important;
    top: 40% !important;
    width: 8px !important;
    height: 16px !important;
  }

  .ant-checkbox + span {
    color: #69728a;
  }
`;

export default StyledCheckbox;
