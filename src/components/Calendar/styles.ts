import styled, { IStyledComponent } from "styled-components";
import { leftColumnWidth, leftColumnWidthCss } from "@/constants";

export const StyledOuterWrapper: IStyledComponent<any, any> = styled.div`
  position: relative;
  display: flex;
`;

export const StyledInnerWrapper: IStyledComponent<any, any> = styled.div`
  position: relative;
  margin-left: ${leftColumnWidth};
  display: flex;
  flex-direction: column;
  contain: paint;
`;

export const StyledEmptyBoxWrapper: IStyledComponent<any, any> = styled.div<{ width: number }>`
  width: calc(${({ width }) => width}px - ${leftColumnWidthCss});
  position: sticky;
  top: 0;
  height: 100%;
  left: ${leftColumnWidthCss};
  display: flex;
  justify-content: center;
  align-items: center;
`;
