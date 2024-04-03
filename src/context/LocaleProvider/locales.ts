import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { it } from "@/locales/it";
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
    id: "it",
    name: "ITALIAN",
    lang: it,
    translateCode: "it-IT"
  }
];
