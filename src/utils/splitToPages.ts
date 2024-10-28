import {
  PaginatedSchedulerData,
  PaginatedSchedulerRow,
  SchedulerData,
  SchedulerProjectData
} from "@/types/global";

export const splitToPages = (
  data: SchedulerData,
  projectsPerPerson: SchedulerProjectData[][][][],
  rowsPerPerson: number[],
  recordsThreshold: number
) => {
  const pages: PaginatedSchedulerData[] = [];

  let leftIndex = 0;
  let singlePage: PaginatedSchedulerRow[] = [];
  let pageRecords = 0;

  if (projectsPerPerson.length > recordsThreshold) {
    projectsPerPerson.forEach((projects, i) => {
      const seats: any = structuredClone(data[i].seats);
      const numberOfSeats = seats.length;
      for (let j = 0; j <= numberOfSeats - 1; j++) {
        seats[j].data = structuredClone(projects[j]);
      }

      const newItem = { id: data[i].id, label: data[i].label, seats: seats };

      if (pageRecords >= recordsThreshold) {
        pages.push(singlePage);
        leftIndex += singlePage.length;
        singlePage = [];
        pageRecords = 0;
      }

      pageRecords++;
      singlePage.push(newItem);
    });

    if (rowsPerPerson.slice(leftIndex).length <= recordsThreshold) {
      singlePage = [];
      projectsPerPerson.slice(leftIndex).forEach((projects, i) => {
        const seats: any = structuredClone(data[i].seats);
        const numberOfSeats = seats.length;
        for (let j = 0; j <= numberOfSeats - 1; j++) {
          seats[j].data = structuredClone(projects[j]);
        }
        const newItem = {
          id: data[i + leftIndex].id,
          label: data[i + leftIndex].label,
          seats: seats
        };
        singlePage.push(newItem);

        if (i === projectsPerPerson.length - leftIndex - 1) pages.push(singlePage);
      });
    }

    return pages;
  }
  projectsPerPerson.forEach((projects, i) => {
    const seats: any = structuredClone(data[i].seats);
    const numberOfSeats = seats.length;
    for (let j = 0; j <= numberOfSeats - 1; j++) {
      seats[j].data = structuredClone(projects[j]) ?? [];
    }

    const newItem = { id: data[i].id, label: data[i].label, seats: seats };
    singlePage.push(newItem);
  });

  pages.push(singlePage);

  return pages;
};
