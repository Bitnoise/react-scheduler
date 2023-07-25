import { theme } from "@/styles";
import { DrawRowConfig } from "@/types/global";

const defaultFillStyle = theme.colors.white;

export const drawRow = (config: DrawRowConfig) => {
  const {
    ctx,
    x,
    y,
    width,
    height,
    textYPos,
    label,
    font,
    isBottomRow,
    fillStyle,
    topText,
    bottomText
  } = config;

  ctx.beginPath();
  ctx.strokeStyle = theme.colors.grey400;
  ctx.setLineDash([]);

  if (label && font && textYPos) {
    ctx.fillStyle = defaultFillStyle;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x + 0.5, y + 0.5, width, height);

    ctx.font = font;

    const textXPos = x + width / 2 - ctx.measureText(label).width / 2;
    ctx.textBaseline = "middle";
    ctx.fillStyle = theme.colors.grey600;
    ctx.fillText(label, textXPos, textYPos);
  }
  if (isBottomRow && fillStyle && topText && bottomText) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x + 0.5, y + 0.5, width, height);

    ctx.font = topText.font;

    const dayNameXPos = x + width / 2 - ctx.measureText(topText.label).width / 2;

    ctx.fillStyle = topText.color;
    ctx.fillText(topText.label, dayNameXPos, topText.y);

    ctx.font = bottomText.font;

    const dayNumXPos = x + width / 2 - ctx.measureText(bottomText.label).width / 2;

    ctx.fillStyle = bottomText.color;
    ctx.fillText(bottomText.label, dayNumXPos, bottomText.y);
  }
};
