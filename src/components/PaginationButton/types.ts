export type PaginationButtonProps = {
  intent: "previous" | "next";
  isVisible: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
};

export type StyledPaginationButton = {
  isVisible: boolean;
};
