const darkText = "#101828";
const lightText = "#FFFFFF";

// accepts #rgb, #rrggbb and rgb()/rgba() strings
const parseColor = (color: string): number[] | null => {
  const value = color.trim();
  const rgbMatch = value.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  if (rgbMatch) return rgbMatch.slice(1, 4).map((channel) => Number(channel) / 255);

  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})/i);
  if (!hexMatch) return null;
  const hex =
    hexMatch[1].length === 3
      ? hexMatch[1]
          .split("")
          .map((c) => c + c)
          .join("")
      : hexMatch[1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
};

/**
 * picks a dark or light text colour for the given tile background,
 * using its relative luminance (WCAG 2.1)
 * @param color - background of the tile (hex or rgb())
 * @example
 * // returns "#101828"
 * getTileTextColor("rgb(250, 204, 21)")
 * @example
 * // returns "#FFFFFF"
 * getTileTextColor("#000000");
 */
export const getTileTextColor = (color: string): string => {
  const rgb = color ? parseColor(color) : null;
  if (!rgb) return lightText;

  const [r, g, b] = rgb.map((val) =>
    val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  );
  const relativeLuminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // a consumer can force another colour through the tile style (style.color)
  return relativeLuminance > 0.5 ? darkText : lightText;
};
