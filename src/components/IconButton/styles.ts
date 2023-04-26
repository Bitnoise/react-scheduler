import styled from "styled-components";

type ButtonWrapperProps = {
  isFullRounded?: boolean;
  hasChildren?: boolean;
};

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ isFullRounded }) => (isFullRounded ? "50%" : "4px")};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  gap: 4px;
  padding: ${({ hasChildren }) => (hasChildren ? "0 10px" : "0")};
`;
