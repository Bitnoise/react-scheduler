/**
 * calculates whether or not text on given hex color should be black or white
 * based on WCAG 2.0 recommendations
 * @param hexColor - color of the background on which font will be placed
 * @returns font color that matches contrast recommended by WCAG 2.0 (black or white)
 * @example
 * // returns "black"
 * getTextColor("#FFFFFF")
 * @example
 * // returns "white"
 * getTextColor("#000000");
 */
export const getTileTextColor = (hexColor: string) => {
  if (!hexColor) return "white";

  // convert hex to rgb values
  const rgb = [];
  for (let i = 1; i < 6; i += 2) {
    rgb.push(parseInt(hexColor.slice(i, i + 2), 16) / 255);
  }

  /*
  relative luminance calculated based on requirements form: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
  */
  const sRGBValues = rgb.map((val) =>
    val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  );

  const relativeLuminance =
    0.2126 * sRGBValues[0] + 0.7152 * sRGBValues[1] + 0.0722 * sRGBValues[2];

  return relativeLuminance > 0.5 ? "black" : "white";
};
