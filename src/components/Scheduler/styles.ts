import styled, { IStyledComponent } from "styled-components";
import {
  leftColumnWidth,
  leftColumnWidthCssVar,
  mobileLeftColumnWidth,
  mobileMediaQuery
} from "@/constants";
import { StyledOutsideWrapperProps } from "./types";

export const StyledOutsideWrapper: IStyledComponent<any, any> =
  styled.div<StyledOutsideWrapperProps>`
    ${leftColumnWidthCssVar}: ${leftColumnWidth}px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    overflow-x: ${({ $showScroll }) => ($showScroll ? "scroll" : "hidden")};
    background-color: ${({ theme }) => theme.colors.gridBackground};

    @media ${mobileMediaQuery} {
      ${leftColumnWidthCssVar}: ${mobileLeftColumnWidth}px;
    }
  `;
export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  position: relative;
`;
