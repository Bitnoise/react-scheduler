import { headerHeight } from "@/constants";
import { theme } from "@/styles";

export const drawDashedLine = (
  ctx: CanvasRenderingContext2D,
  startPos: number,
  lineLength: number
) => {
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = theme.colors.grey;

  ctx.moveTo(startPos, headerHeight);
  ctx.lineTo(startPos, lineLength);
  ctx.stroke();
};
