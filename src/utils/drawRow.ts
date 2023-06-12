import { theme } from "@/styles";

const defaultFillStyle = theme.colors.white;

type BottomRowText = {
  yPos: number;
  label: string;
  font: string;
  color: string;
};

export const drawRow = (
  ctx: CanvasRenderingContext2D,
  xPos: number,
  yPos: number,
  width: number,
  height: number,
  textYPos?: number,
  label?: string,
  font?: string,
  isBottomRow?: boolean,
  fillStyle?: string,
  topText?: BottomRowText,
  bottomText?: BottomRowText
) => {
  ctx.beginPath();
  ctx.strokeStyle = theme.colors.grey;
  ctx.setLineDash([]);

  if (label && font && textYPos) {
    ctx.fillStyle = defaultFillStyle;
    ctx.fillRect(xPos, yPos, width, height);
    ctx.strokeRect(xPos + 0.5, yPos + 0.5, width, height);

    ctx.font = font;

    const textXPos = xPos + width / 2 - ctx.measureText(label).width / 2;
    ctx.textBaseline = "middle";
    ctx.fillStyle = theme.colors.darkGrey;
    ctx.fillText(label, textXPos, textYPos);
  }
  if (isBottomRow && fillStyle && topText && bottomText) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(xPos, yPos, width, height);
    ctx.strokeRect(xPos + 0.5, yPos + 0.5, width, height);

    ctx.font = topText.font;

    const dayNameXPos = xPos + width / 2 - ctx.measureText(topText.label).width / 2;

    ctx.fillStyle = topText.color;
    ctx.fillText(topText.label, dayNameXPos, topText.yPos);

    ctx.font = bottomText.font;

    const dayNumXPos = xPos + width / 2 - ctx.measureText(bottomText.label).width / 2;

    ctx.fillStyle = bottomText.color;
    ctx.fillText(bottomText.label, dayNumXPos, bottomText.yPos);
  }
};
