import { FC } from "react";
import { DropZoneProps } from "./types";
import { StyledDropZone } from "./styles";

const DropZone: FC<DropZoneProps> = ({ topPosition, onDragOver, onDrop }) => {
  return <StyledDropZone topPosition={topPosition} onDragOver={onDragOver} onDrop={onDrop} />;
};

export default DropZone;
