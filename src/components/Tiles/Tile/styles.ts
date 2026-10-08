import styled, { IStyledComponent } from "styled-components";
import { leftColumnWidthCss, tileHeight } from "@/constants";
import { marginPaddingReset, truncate } from "@/styles";
import { StyledTextProps, StyledTileWrapperProps } from "./types";

export const StyledTileWrapper: IStyledComponent<any, any> = styled.button<StyledTileWrapperProps>`
  ${marginPaddingReset}
  height: ${tileHeight}px;
  position: absolute;
  outline: none;
  border: none;
  border-radius: 6px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  cursor: pointer;
  // inner hairline keeps neighbouring tiles of the same colour apart
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(16, 24, 40, 0.08);
  transition:
    box-shadow 0.15s ease,
    filter 0.15s ease;

  &:hover {
    z-index: 1;
    filter: brightness(1.04) saturate(1.05);
    box-shadow:
      inset 0 0 0 1px rgba(0, 0, 0, 0.1),
      0 4px 12px rgba(16, 24, 40, 0.18);
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
  ${({ $preview, theme }) =>
    $preview &&
    `
    opacity: 0.6;
    pointer-events: none;
    outline: 2px dashed ${theme.colors.accent};
    outline-offset: 1px;
  `}
`;

export const StyledTextWrapper: IStyledComponent<any, any> = styled.div`
  margin: 0 8px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 11px;
  line-height: 13px;
`;

export const StyledText: IStyledComponent<any, any> = styled.p<StyledTextProps>`
  ${marginPaddingReset}
  ${truncate}
  display: block;
  font-weight: ${({ $bold }) => ($bold ? "600" : "400")};
  & + & {
    margin-top: 2px;
    font-size: 10px;
    opacity: 0.85;
  }
`;

export const StyledDescription: IStyledComponent<any, any> = styled.p`
  ${marginPaddingReset}
  ${truncate}
  font-size: 10px;
  opacity: 0.85;
  &:empty {
    display: none;
  }
`;

export const StyledStickyWrapper: IStyledComponent<any, any> = styled.div`
  position: sticky;
  left: calc(${leftColumnWidthCss} + 8px);
  overflow: hidden;
`;
