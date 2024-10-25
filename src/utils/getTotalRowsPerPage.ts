import { PaginatedSchedulerData } from "@/types/global";

export const getTotalRowsPerPage = (page: PaginatedSchedulerData) => {
  const s = page
    .map((x) => {
      let count = 1;

      x.seats.forEach((seat) => (count += seat.data.length));

      return count;
    })
    .reduce((acc, curr) => acc + Math.max(curr, 1), 0);

  return s;
};
