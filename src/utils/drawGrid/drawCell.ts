import { boxHeight } from "@/constants";
import { getCanvasColors, Theme } from "@/styles";

// only the left separator is stroked: horizontal lines are drawn once per person in drawGrid
export const drawCell = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  isBusinessDay: boolean,
  isCurrentDay: boolean,
  theme: Theme
): void => {
  const colors = getCanvasColors(theme);
  if (isCurrentDay) {
    ctx.fillStyle = colors.today;
    ctx.fillRect(x, y, width, boxHeight);
  } else if (!isBusinessDay) {
    ctx.fillStyle = colors.weekend;
    ctx.fillRect(x, y, width, boxHeight);
  }
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = theme.colors.border;
  ctx.moveTo(Math.round(x) + 0.5, y);
  ctx.lineTo(Math.round(x) + 0.5, y + boxHeight);
  ctx.stroke();
};
