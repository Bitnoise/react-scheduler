import { useEffect, useRef } from "react";
import { drawGrid } from "@/utils/drawGrid";
import { GridProps } from "./types";
import { StyledCanvas } from "./styles";

const Grid = ({ days, zoom }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.letterSpacing = "1px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid(ctx, zoom, days);
  }, [days, zoom]);

  return <StyledCanvas ref={canvasRef} />;
};

export default Grid;
