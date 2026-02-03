import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const SelectWrapper = styled.div`
  position: relative;

  .ant-select-selector {
    height: 40px !important;
    border: none !important;
    background: #dfe9ff !important;
    box-shadow:
      inset 5px 5px 5px #cbd4e8,
      inset -5px -5px 5px #f3feff;
    color: #69728a !important;
    display: flex;
    align-items: center;
    border-radius: 10px !important; /* Added border-radius */
  }

  .ant-select-focused {
    .ant-select-selector {
      height: 40px !important;
      border: none !important;
      background: #dfe9ff !important;
      box-shadow:
        inset 5px 5px 5px #cbd4e8,
        inset -5px -5px 5px #f3feff !important;
      color: #69728a !important;
      border-radius: 10px !important;
    }
  }

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    // color: #69728a !important;
  }

  .ant-select-single {
    height: 40px !important;
  }

  .ant-select-arrow {
    color: #69728a !important;
    position: absolute;
    right: 10px;
    top: 50%;
  }

  .ant-select-dropdown {
    background-color: #dfe9ff !important;
    border-radius: 10px !important;
    box-shadow: 30px 30px 60px #69728a;
    padding: 0 !important;

    .ant-select-item {
      color: #69728a !important;
    }

    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: #cdd9f8 !important;
    }

    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background-color: #bfcef3 !important;
      font-weight: 600;
    }
  }
`;

const StyledSelect = (props) => {
  return (
    <SelectWrapper>
      <Select
        {...props}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      />
    </SelectWrapper>
  );
};

export default StyledSelect;
