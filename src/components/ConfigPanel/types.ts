import { ConfigFormValues } from "@/types/global";

export type ConfigPanelProps = {
  values: ConfigFormValues;
  onSubmit: (values: ConfigFormValues) => void;
};
