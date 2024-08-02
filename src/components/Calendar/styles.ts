import styled from "styled-components";
import { leftColumnWidth } from "@/constants";

export const StyledOuterWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const StyledInnerWrapper = styled.div`
  position: relative;
  margin-left: ${leftColumnWidth};
  display: flex;
  flex-direction: column;
  contain: paint;
`;

export const StyledEmptyBoxWrapper = styled.div<{ width: number }>`
  width: calc(${({ width }) => width}px - ${leftColumnWidth}px);
  position: sticky;
  top: 0;
  height: 100%;
  left: ${leftColumnWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
