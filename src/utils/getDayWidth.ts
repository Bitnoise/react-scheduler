import { dayWidth, mobileDayWidth } from "@/constants";
import { isMobileViewport } from "./getLeftColumnWidth";

export const getDayWidth = (): number => (isMobileViewport() ? mobileDayWidth : dayWidth);
