import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 30px;
  position: relative;
  transition: background-color 0.3s ease;
`;

export const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.button};
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${({ theme }) => (theme.mode === "light" ? "4px" : "34px")};
  transition: left 0.3s ease;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 5px;
  left: ${({ theme }) => (theme.mode === "light" ? "38px" : "4px")};
  transition: left 0.3s ease;
`;
