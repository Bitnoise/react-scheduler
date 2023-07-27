export type PaginationProps = {
  children?: React.ReactNode;
  pageNum: number;
  pagesAmount: number;
  onLoadNext: () => void;
  onLoadPrevious: () => void;
};
