import styled from "styled-components";
import { leftColumnWidth } from "@/constants";

export const StyledOuterWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const StyledInnerWrapper = styled.div`
  margin-left: ${leftColumnWidth};
  display: flex;
  flex-direction: column;
`;
