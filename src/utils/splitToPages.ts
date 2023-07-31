import {
  PaginatedSchedulerData,
  PaginatedSchedulerRow,
  SchedulerData,
  SchedulerProjectData
} from "@/types/global";

export const splitToPages = (
  data: SchedulerData,
  projectsPerPerson: SchedulerProjectData[][][],
  rowsPerPerson: number[],
  recordsThreshold: number
) => {
  const pages: PaginatedSchedulerData[] = [];

  let leftIndex = 0;
  let singlePage: PaginatedSchedulerRow[] = [];
  let pageRecords = 0;

  if (projectsPerPerson.length > recordsThreshold) {
    projectsPerPerson.forEach((projects, i) => {
      const newItem = { id: data[i].id, label: data[i].label, data: projects };

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
        const newItem = {
          id: data[i + leftIndex].id,
          label: data[i + leftIndex].label,
          data: projects
        };
        singlePage.push(newItem);

        if (i === projectsPerPerson.length - leftIndex - 1) pages.push(singlePage);
      });
    }

    return pages;
  }
  projectsPerPerson.forEach((projects, i) => {
    const newItem = { id: data[i].id, label: data[i].label, data: projects };
    singlePage.push(newItem);
  });

  pages.push(singlePage);

  return pages;
};
