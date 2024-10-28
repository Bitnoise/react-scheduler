import styled from "styled-components";
import { boxHeight } from "@/constants";

export const StyledDropZone = styled.div<{ topPosition: number }>`
  position: absolute;
  z-index: 8;
  width: 100%;
  top: ${({ topPosition }) => topPosition}px;
  height: ${boxHeight}px;
`;
