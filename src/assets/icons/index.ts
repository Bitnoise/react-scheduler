import add from "./svgs/add.svg?react";
import subtract from "./svgs/subtract.svg?react";
import filter from "./svgs/filter.svg?react";
import arrowLeft from "./svgs/arrow-left.svg?react";
import arrowRight from "./svgs/arrow-right.svg?react";
import defaultAvatar from "./svgs/default-avatar.svg?react";
import calendarWarning from "./svgs/calendar-warning.svg?react";
import calendarFree from "./svgs/calendar-free.svg?react";
import arrowUp from "./svgs/arrow-up.svg?react";
import arrowDown from "./svgs/arrow-down.svg?react";
import search from "./svgs/search.svg?react";
import close from "./svgs/close.svg?react";
import moon from "./svgs/moon.svg?react";
import sun from "./svgs/sun.svg?react";
import { Icon, IconsNames } from "./types";

const icons: { [key in IconsNames]: Icon } = {
  add,
  subtract,
  filter,
  arrowLeft,
  arrowRight,
  defaultAvatar,
  calendarWarning,
  calendarFree,
  arrowDown,
  arrowUp,
  search,
  close,
  moon,
  sun
};

export default icons;
