import { SchedulerData } from "@/types/global";

export const mockedOnRangeChange = () => {
  console.log("Mocked on range change has been triggered");
};

export const mockedData: SchedulerData = [
  {
    label: {
      icon: "icon",
      title: "Title",
      subtitle: "Subtitle"
    },
    data: [
      {
        startDate: new Date("04.26.2023"),
        endDate: new Date("04.27.2023"),
        title: "Data title",
        subtitle: "Data subtitle",
        description: "Data description"
      }
    ]
  }
];
