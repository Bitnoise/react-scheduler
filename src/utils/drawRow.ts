import { Theme } from "@/styles";
import { DrawRowConfig } from "@/types/global";

export const drawRow = (config: DrawRowConfig, theme: Theme) => {
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
    bottomText,
    labelBetweenCells
  } = config;

  ctx.beginPath();
  ctx.strokeStyle = theme.colors.border;
  ctx.setLineDash([]);

  if (label && font && textYPos) {
    ctx.fillStyle = theme.colors.gridBackground;
    ctx.fillRect(x, y, width, height);

    if (labelBetweenCells) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.stroke();

      ctx.moveTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.stroke();

      ctx.moveTo(x + width / 2, y + height);
      ctx.lineTo(x + width / 2, y + height - 5);
      ctx.stroke();
    } else {
      ctx.strokeRect(x + 0.5, y + 0.5, width, height);
    }

    ctx.font = font;

    const textXPos = x + width / 2 - ctx.measureText(label).width / 2;
    ctx.textBaseline = "middle";
    ctx.fillStyle = theme.colors.placeholder;
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
