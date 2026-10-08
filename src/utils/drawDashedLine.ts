import { Theme } from "@/styles";

export const drawDashedLine = (
  ctx: CanvasRenderingContext2D,
  startPos: number,
  lineLength: number,
  theme: Theme
): void => {
  ctx.beginPath();
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = theme.colors.placeholder;
  ctx.globalAlpha = 0.45;
  ctx.moveTo(Math.round(startPos) + 0.5, 0.5);
  ctx.lineTo(Math.round(startPos) + 0.5, lineLength + 0.5);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.setLineDash([]);
};
