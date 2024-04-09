import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { fr } from "@/locales/fr";
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
    id: "fr",
    name: "FRENCH",
    lang: fr,
    translateCode: "fr-FR"
  }
];
