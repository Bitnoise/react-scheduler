import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { lt } from "@/locales/lt";

import { LocaleType } from "./types";

export const locales: LocaleType[] = [
  {
    id: "en",
    name: "ENGLISH",
    lang: en,
    translateCode: "en-GB"
  },
  {
    id: "pl",
    name: "POLISH",
    lang: pl,
    translateCode: "pl-PL"
  },
  {
    id: "lt",
    name: "LITHUANIAN",
    lang: lt,
    translateCode: "lt-LT"
  }
];
