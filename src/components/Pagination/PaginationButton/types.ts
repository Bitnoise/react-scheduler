export type PaginationButtonProps = {
  intent: "previous" | "next";
  isVisible: boolean;
  onLoadNext?: () => void;
  onLoadPrevious?: () => void;
  icon?: React.ReactNode;
};

export type StyledPaginationButton = {
  isVisible: boolean;
};
