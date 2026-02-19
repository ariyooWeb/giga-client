import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  height: 50px;
  border-radius: 10px;
  color: #69728a;
  box-shadow:
    6px 6px 13px #b5c0ce,
    -6px -6px 13px #e1f0ff;
  background: linear-gradient(
    90deg,
    rgba(235, 178, 195, 1) 0%,
    rgb(203, 216, 232) 100%
  );
  border: none !important;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(235, 178, 195, 1) 0%,
      rgb(203, 216, 232) 100%
    ) !important;
    font-weight: bold !important;
    color: #69728a !important;
    box-shadow:
      8px 8px 16px #9ca6b3,
      -8px -8px 16px #faffff !important;
  }
`;

export default StyledButton;
