import { Theme } from "@/styles";
import { DrawRowConfig } from "@/types/global";

const labelPadding = 10;

// first canvas x visible on screen: left-aligned labels stick to it, like sticky headers
let stickyLabelStart = 0;
export const setStickyLabelStart = (x: number): void => {
  stickyLabelStart = Math.max(0, x);
};

// letterSpacing isn't in every TS dom lib yet
const setLetterSpacing = (ctx: CanvasRenderingContext2D, value = "0px") => {
  (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = value;
};

const drawSeparators = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  theme: Theme,
  withLeftLine = true
) => {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = theme.colors.border;
  if (withLeftLine) {
    ctx.moveTo(Math.round(x) + 0.5, y);
    ctx.lineTo(Math.round(x) + 0.5, y + height);
  }
  ctx.moveTo(x, y + height - 0.5);
  ctx.lineTo(x + width, y + height - 0.5);
  ctx.stroke();
};

export const drawRow = (config: DrawRowConfig, theme: Theme): void => {
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
    labelBetweenCells,
    color,
    letterSpacing,
    align = "center"
  } = config;

  ctx.textBaseline = "middle";

  if (label && font && textYPos) {
    ctx.fillStyle = theme.colors.gridBackground;
    ctx.fillRect(x, y, width, height);

    if (labelBetweenCells) {
      drawSeparators(ctx, x, y, height, width, theme, false);
      // hour tick
      ctx.beginPath();
      ctx.moveTo(Math.round(x + width / 2) + 0.5, y + height);
      ctx.lineTo(Math.round(x + width / 2) + 0.5, y + height - 6);
      ctx.stroke();
    } else {
      drawSeparators(ctx, x, y, height, width, theme);
    }

    ctx.font = font;
    setLetterSpacing(ctx, letterSpacing);
    const textWidth = ctx.measureText(label).width;
    const textXPos =
      align === "left"
        ? Math.min(
            Math.max(x, stickyLabelStart) + labelPadding,
            x + width - textWidth - labelPadding
          )
        : x + width / 2 - textWidth / 2;
    ctx.fillStyle = color ?? theme.colors.placeholder;
    ctx.fillText(label, textXPos, textYPos);
  }
  if (isBottomRow && fillStyle && topText && bottomText) {
    ctx.fillStyle = theme.colors.gridBackground;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
    drawSeparators(ctx, x, y, height, width, theme);

    [topText, bottomText].forEach((text) => {
      ctx.font = text.font;
      setLetterSpacing(ctx, text.letterSpacing);
      const textWidth = ctx.measureText(text.label).width;
      const centerX = x + width / 2;

      if (text.circleColor) {
        const radius = Math.max(11, textWidth / 2 + 3);
        ctx.beginPath();
        ctx.fillStyle = text.circleColor;
        ctx.arc(centerX, text.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = text.color;
      // +1: optical centring of digits with a middle baseline
      ctx.fillText(text.label, centerX - textWidth / 2, text.y + (text.circleColor ? 1 : 0));
    });
  }
  setLetterSpacing(ctx);
};
