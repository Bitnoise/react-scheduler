import styled, { IStyledComponent, keyframes } from "styled-components";
import { StyledWrapperProps } from "./types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`;

const indeterminate = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60%, 100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminateShort = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60%, 100% {
    left: 107%;
    right: -8%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

// panel fading from the loading edge towards the visible grid
export const StyledWrapper: IStyledComponent<any, any> = styled.div<StyledWrapperProps>`
  width: 388px;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${({ $position }) => ($position === "left" ? 0 : "auto")};
  right: ${({ $position }) => ($position === "right" ? 0 : "auto")};
  background: ${({ theme, $position }) =>
    `linear-gradient(${$position === "left" ? "90deg" : "270deg"}, color-mix(in srgb, ${theme.colors.background} 80%, transparent), color-mix(in srgb, ${theme.colors.background} 55%, transparent) 60%, transparent)`};
  mask-image: ${({ $position }) =>
    `linear-gradient(${$position === "left" ? "to left" : "to right"}, transparent, #000 45%)`};
  overflow: clip;
  z-index: 1;
  animation: ${fadeIn} 200ms ease-out;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      `linear-gradient(100deg, transparent 20%, color-mix(in srgb, ${theme.colors.accent} ${theme.mode === "dark" ? 16 : 9}%, transparent) 50%, transparent 80%)`};
    animation: ${shimmer} 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      transform: none;
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }
`;

// thin indeterminate progress bar, kept at the top of the view while scrolling vertically
export const StyledProgressBar: IStyledComponent<any, any> = styled.div`
  position: sticky;
  top: 0;
  height: 3px;
  overflow: hidden;
  z-index: 1;
  background-color: ${({ theme }) => `color-mix(in srgb, ${theme.colors.accent} 15%, transparent)`};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.accent};
  }

  &::before {
    animation: ${indeterminate} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &::after {
    animation: ${indeterminateShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      left: 0;
      right: 0;
      animation: ${pulse} 2s ease-in-out infinite;
    }

    &::after {
      display: none;
    }
  }
`;
