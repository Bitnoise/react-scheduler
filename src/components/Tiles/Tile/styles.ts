import styled from "styled-components";
import { leftColumnWidth, tileHeight } from "@/constants";
import { marginPaddingReset, truncate } from "@/styles";
import { StyledTextProps } from "./types";

export const StyledTileWrapper = styled.button`
  ${marginPaddingReset}
  height: ${tileHeight}px;
  position: absolute;
  outline: none;
  border: none;
  border-radius: 4px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  cursor: pointer;
`;

export const StyledTextWrapper = styled.div`
  margin: 10px 16px;
  position: relative;
  display: flex;
  font-size: 10px;
  letter-spacing: 0.5px;
  line-height: 12px;
`;

export const StyledText = styled.p<StyledTextProps>`
  ${marginPaddingReset}
  ${truncate}
  display: inline;
  font-weight: ${({ bold }) => (bold ? "600" : "400")};
  &:first-child {
    &::after {
      content: "|";
      margin: 0 3px;
    }
  }
`;

export const StyledDescription = styled.p`
  ${marginPaddingReset}
  ${truncate}
`;

export const StyledStickyWrapper = styled.div`
  position: sticky;
  left: ${leftColumnWidth + 16}px;
  overflow: hidden;
`;
