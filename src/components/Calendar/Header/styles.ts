import styled, { IStyledComponent } from "styled-components";
import { headerHeight } from "@/constants";

export const StyledOuterWrapper: IStyledComponent<any, any> = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledWrapper: IStyledComponent<any, any> = styled.div`
  height: ${headerHeight}px;
  display: block;
`;

export const StyledCanvas: IStyledComponent<any, any> = styled.canvas``;
