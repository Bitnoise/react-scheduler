export type PaginationButtonProps = {
  intent: "previous" | "next";
  isVisible: boolean;
  onClick: () => void;
  pageNum: number;
  pagesAmount: number;
  icon?: React.ReactNode;
};

export type StyledPaginationButton = {
  isVisible: boolean;
};
