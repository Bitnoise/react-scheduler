import styled, { css } from "styled-components";
import { StyledSpanProps } from "./types";

export const StyledWrapper = styled.div`
  margin-top: 44px;
  overflow: scroll;
`;

export const StyledInnerWrapper = styled.div`
  position: relative;
  width: max-content;
  display: flex;
`;

export const StyledCanvas = styled.canvas``;

export const StyledSpan = styled.span<StyledSpanProps>`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  ${({ position }) => {
    switch (position) {
      case "right":
        return css`
          right: 0;
        `;
      case "left":
        return css`
          left: 0;
        `;
    }
  }}
  background-color: transparent;
`;
