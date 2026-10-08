import styled, { IStyledComponent, keyframes } from "styled-components";
import { StyledSpanProps } from "./types";

export const StyledWrapper: IStyledComponent<any, any> = styled.div`
  height: calc(100vh - headerHeight);
`;

const slideFromRight = keyframes`
  from {
    transform: translateX(16px);
    opacity: 0.4;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromLeft = keyframes`
  from {
    transform: translateX(-16px);
    opacity: 0.4;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  position: relative;

  &.slide-next {
    animation: ${slideFromRight} 220ms ease-out;
  }

  &.slide-prev {
    animation: ${slideFromLeft} 220ms ease-out;
  }
`;

export const StyledCanvas: IStyledComponent<any, any> = styled.canvas``;
export const StyledCanvasHeader: IStyledComponent<any, any> = styled.canvas``;

export const StyledSpan: IStyledComponent<any, any> = styled.span<StyledSpanProps>`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${({ $position }) => ($position === "left" ? 0 : "auto")};
  right: ${({ $position }) => ($position === "right" ? 0 : "auto")};
`;

export const StyledSelectedCell: IStyledComponent<any, any> = styled.div`
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  background-color: ${({ theme }) => `color-mix(in srgb, ${theme.colors.accent} 12%, transparent)`};
  border-radius: 6px;
  box-shadow: 0 0 0 3px ${({ theme }) => `color-mix(in srgb, ${theme.colors.accent} 15%, transparent)`};
`;
