import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { dayWidth } from "@/constants";
import { GridProps } from "./types";

const USERS_QUANTITY = 10;
const BOX_HEIGHT = 60;

const Grid = ({ days }: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const daysInYear = days.length;
  const drawRectange = useCallback(
    (
      x: number,
      y: number,
      ctx: CanvasRenderingContext2D,
      isBussinessDay: boolean,
      isCurrentDay: boolean
    ) => {
      ctx.strokeStyle = theme.colors.grey;
      if (isCurrentDay) {
        ctx.fillStyle = theme.colors.hover;
      } else if (isBussinessDay) {
        ctx.fillStyle = theme.colors.white;
      } else {
        ctx.fillStyle = theme.colors.superLightBlue;
      }

      ctx.beginPath();
      ctx.fillRect(x, y, dayWidth, BOX_HEIGHT);
      ctx.strokeRect(x, y, dayWidth, BOX_HEIGHT);
    },
    [theme.colors.grey, theme.colors.hover, theme.colors.superLightBlue, theme.colors.white]
  );

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.canvas.width = daysInYear * dayWidth;
      ctx.canvas.height = USERS_QUANTITY * BOX_HEIGHT;

      days.map((day, index) => {
        for (let y = 0; y <= USERS_QUANTITY; y++) {
          drawRectange(index * dayWidth, y * BOX_HEIGHT, ctx, day.isBussinessDay, day.isCurrentDay);
        }
      });
    },
    [days, daysInYear, drawRectange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    drawGrid(ctx);
  }, [drawGrid]);

  return <canvas ref={canvasRef} />;
};

export default Grid;
