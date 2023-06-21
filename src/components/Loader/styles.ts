import styled, { css, keyframes } from "styled-components";
import { StyledWrapperProps } from "./types";

export const StyledWrapper = styled.div<StyledWrapperProps>`
  width: 388px;
  height: 100%;
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case "right":
        return css`
          right: 0;
        `;
      case "left":
        return css`
          left: 0;
        `;
    }
  }}
  background-color: ${({ theme }) => theme.colors.hover};
  opacity: 0.7;
  overflow: hidden;
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
