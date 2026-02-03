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
  }
`;

export default StyledInput;
