import { boxHeight } from "@/constants";
import { Theme } from "@/styles";

export const drawCell = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  isBusinessDay: boolean,
  isCurrentDay: boolean,
  theme: Theme
) => {
  ctx.strokeStyle = theme.colors.border;
  if (isCurrentDay) {
    ctx.fillStyle = theme.colors.secondary;
  } else if (isBusinessDay) {
    ctx.fillStyle = "transparent";
  } else {
    ctx.fillStyle = theme.colors.primary;
  }
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.fillRect(x, y, width, boxHeight);
  ctx.strokeRect(x + 0.5, y + 0.5, width, boxHeight);
};
