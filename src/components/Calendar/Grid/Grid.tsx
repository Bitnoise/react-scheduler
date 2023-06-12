import { useEffect, useRef } from "react";
import { drawGrid } from "@/utils/drawGrid";
import { GridProps } from "./types";
import { StyledCanvas, StyledWrapper } from "./styles";

const Grid = ({ days, zoom, rows }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid(ctx, zoom, days, rows);
  }, [days, rows, zoom]);

  return (
    <StyledWrapper>
      <StyledCanvas ref={canvasRef} />
    </StyledWrapper>
  );
};

export default Grid;
