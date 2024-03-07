import { en } from "@/locales/en";
import { pl } from "@/locales/pl";
import { ptBR } from "@/locales/ptBR";
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
    id: "pt-BR",
    name: "PORTUGUESE",
    lang: ptBR,
    translateCode: "pt-BR"
  }
];
