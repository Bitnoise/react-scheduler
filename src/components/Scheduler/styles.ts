import styled from "styled-components";
import { StyledOutsideWrapperProps } from "./types";

export const StyledOutsideWrapper = styled.div<StyledOutsideWrapperProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow-x: ${({ showScroll }) => (showScroll ? "scroll" : "hidden")};
  background-color: ${({ theme }) => theme.colors.gridBackground};
`;
export const StyledInnerWrapper = styled.div`
  position: relative;
`;
