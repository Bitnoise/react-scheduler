import styled from "styled-components";
import { leftColumnWidth } from "@/constants";

export const StyledOuterWrapper = styled.div`
  position: relative;
  display: flex;
  min-height: 100%;
`;

export const StyledInnerWrapper = styled.div`
  position: relative;
  margin-left: ${leftColumnWidth};
  display: flex;
  flex-direction: column;
  contain: paint;
`;
