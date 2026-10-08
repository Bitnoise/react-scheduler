import Add from "./svgs/add.svg?react";
import Subtract from "./svgs/subtract.svg?react";
import Filter from "./svgs/filter.svg?react";
import ArrowLeft from "./svgs/arrow-left.svg?react";
import ArrowRight from "./svgs/arrow-right.svg?react";
import ChevronLeft from "./svgs/chevron-left.svg?react";
import ChevronRight from "./svgs/chevron-right.svg?react";
import DefaultAvatar from "./svgs/default-avatar.svg?react";
import CalendarWarning from "./svgs/calendar-warning.svg?react";
import CalendarFree from "./svgs/calendar-free.svg?react";
import ArrowUp from "./svgs/arrow-up.svg?react";
import ArrowDown from "./svgs/arrow-down.svg?react";
import Search from "./svgs/search.svg?react";
import Close from "./svgs/close.svg?react";
import Moon from "./svgs/moon.svg?react";
import Sun from "./svgs/sun.svg?react";
import { Icon, IconsNames } from "./types";

const icons: Record<IconsNames, Icon> = {
  add: Add,
  subtract: Subtract,
  filter: Filter,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  defaultAvatar: DefaultAvatar,
  calendarWarning: CalendarWarning,
  calendarFree: CalendarFree,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  search: Search,
  close: Close,
  moon: Moon,
  sun: Sun
};

export default icons;
