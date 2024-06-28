import { ReactNode } from "react";
import { LangCodes } from "@/types/global";

export type LocaleContextType = {
  currentLocale: LocaleType;
  localesData: LocaleType[];
  setCurrentLocale: (locale: LocaleType) => void;
};

export type LocaleProviderProps = {
  children: ReactNode;
  lang?: LangCodes | string;
  translations?: LocaleType[];
};

export type Topbar = {
  filters: string;
  next: string;
  prev: string;
  today: string;
  view: string;
};

export type Translation = {
  feelingEmpty: string;
  free: string;
  loadNext: string;
  loadPrevious: string;
  over: string;
  taken: string;
  topbar: Topbar;
  search: string;
  week: string;
};

export type LocaleType = {
  id: string;
  lang: Translation;
  translateCode: string;
  dayjsTranslations: string | ILocale | undefined;
};
