import { ReactNode } from "react";
import { en } from "@/locales/en";
import { LangCodes } from "@/types/global";

export type LocaleContextType = {
  currentLocale: LocaleType;
  locales: LocaleType[];
  setCurrentLocale: (locale: LocaleType) => void;
};

export type LocaleProviderProps = {
  children: ReactNode;
  lang?: LangCodes;
};

export type TranslationType = typeof en;

export type LocaleType = {
  id: string;
  name: string;
  lang: TranslationType;
  translateCode: string;
};
