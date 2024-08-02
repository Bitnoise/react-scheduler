import styled, { keyframes } from "styled-components";
import { StyledWrapperProps } from "./types";

export const StyledWrapper = styled.div<StyledWrapperProps>`
  width: 388px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${({ position }) => (position === "left" ? 0 : "auto")};
  right: ${({ position }) => (position === "right" ? 0 : "auto")};
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7;
  overflow: hidden;
  z-index: 1;
`;

const move = keyframes`
from{
    left: -100%;
}
to{
    left: 100%;
}`;

export const StyledWalker = styled.div`
  width: inherit;
  height: 100%;
  position: absolute;
  background: linear-gradient(90deg, #e6f3ff 1%, #9ec4e7 50%, #e6f3ff 100%);
  animation: ${move} 1s infinite;
`;
