import { ReactComponent as add } from "./svgs/add.svg";
import { ReactComponent as subtract } from "./svgs/subtract.svg";
import { ReactComponent as filter } from "./svgs/filter.svg";
import { ReactComponent as arrowLeft } from "./svgs/arrow-left.svg";
import { ReactComponent as arrowRight } from "./svgs/arrow-right.svg";
import { ReactComponent as defaultAvatar } from "./svgs/default-avatar.svg";
import { ReactComponent as calendarWarning } from "./svgs/calendar-warning.svg";
import { ReactComponent as calendarFree } from "./svgs/calendar-free.svg";
import { ReactComponent as arrowUp } from "./svgs/arrow-up.svg";
import { ReactComponent as arrowDown } from "./svgs/arrow-down.svg";
import { ReactComponent as search } from "./svgs/search.svg";
import { ReactComponent as close } from "./svgs/close.svg";
import { ReactComponent as moon } from "./svgs/moon.svg";
import { ReactComponent as sun } from "./svgs/sun.svg";
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
