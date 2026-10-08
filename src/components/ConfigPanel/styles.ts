import styled, { IStyledComponent } from "styled-components";

type WrapperProps = {
  isExpanded: boolean;
};

export const StyledWrapper: IStyledComponent<any, any> = styled.div<WrapperProps>`
  box-sizing: border-box;
  font-family: Inter;
  padding: 0 0.5rem;
  height: 125px;
  position: fixed;
  top: ${({ isExpanded }) => (isExpanded ? 0 : "-129px")};
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 999;
`;

export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  width: 100%;
  margin-top: 2px;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.5px;
  background-color: white;
`;

export const StyledLabel: IStyledComponent<any, any> = styled.label`
  font-size: 14px;
`;

export const StyledInput: IStyledComponent<any, any> = styled.input`
  width: 45px;
  height: 18px;
  font-size: 14px;
  border: 1px solid #0a11eb;
  border-radius: 4px;
  background-color: white;
  outline: none;
`;

export const StyledCheckbox: IStyledComponent<any, any> = styled.input`
  height: 18px;
  width: 18px;
`;

export const StyledButton: IStyledComponent<any, any> = styled.button`
  width: 100%;
  font-size: 14px;
  outline: none;
  background-color: #fff;
  border: 1px solid #0a11eb;
  border-radius: 4px;
  color: #0a11eb;
  cursor: pointer;
  &:hover {
    background-color: #c9e5ff;
  }
`;

export const StyledForm: IStyledComponent<any, any> = styled.form`
  background-color: rgba(255, 255, 255, 0.75);
`;
