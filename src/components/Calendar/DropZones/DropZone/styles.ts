import styled from "styled-components";
import { boxHeight } from "@/constants";

export const StyledDropZone = styled.div<{ topPosition: number; isDraggedOver: boolean }>`
  position: absolute;
  z-index: 8;
  width: 100%;
  opacity: ${({ isDraggedOver }) => (isDraggedOver ? 0.5 : 0)};
  background: red;
  top: ${({ topPosition }) => topPosition * boxHeight}px;
  height: ${boxHeight}px;
  transition: opacity 0.2s ease, background 0.2s ease;
`;
