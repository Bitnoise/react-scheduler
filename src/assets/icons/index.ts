import { ReactComponent as add } from "./svgs/add.svg";
import { ReactComponent as subtract } from "./svgs/subtract.svg";
import { ReactComponent as filter } from "./svgs/filter.svg";
import { ReactComponent as arrowLeft } from "./svgs/arrow-left.svg";
import { ReactComponent as arrowRight } from "./svgs/arrow-right.svg";
import { Icon, IconsNames } from "./types";

const icons: { [key in IconsNames]: Icon } = {
  add,
  subtract,
  filter,
  arrowLeft,
  arrowRight
};

export default icons;
