import styled from "styled-components";

export const StyledWrapper = styled.div`
  position: fixed;
  z-index: 999;
  background-color: white;
`;

export const StyledCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

export const StyledCheckboxLabel = styled.label`
  width: 60px;
  height: 30px;
  position: relative;
  display: block;
  background: grey;
  border-radius: 100px;
  text-indent: -9999px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 28px;
    transition: 0.3s;
  }
  &:checked {
    background-color: red;
  }
  &:checked + ::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  &:active::after {
    width: 50px;
  }
`;
