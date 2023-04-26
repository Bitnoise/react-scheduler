import styled from "styled-components";

const resetBtnStyles = `
  background: none;
  outline: none;
  border: none;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => theme.navHeight};
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NavigationWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const NavBtn = styled.button`
  ${resetBtnStyles};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

export const Today = styled.button`
  ${resetBtnStyles};
  position: relative;
  font-weight: 600;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 21px;
    background-color: ${({ theme }) => theme.colors.darkViolet};
  }
  &::before {
    left: -18px;
  }
  &::after {
    right: -18px;
  }
`;

export const Zoom = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
`;

export const Filters = styled.div`
  display: flex;
`;
