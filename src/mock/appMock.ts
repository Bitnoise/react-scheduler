import { SchedulerData, SchedulerRowData } from "@/types/global";

export const mockedOnRangeChange = () => {
  console.log("Mocked on range change has been triggered");
};

export const mockedDataExample: SchedulerData = [
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

const titles = [
  "nut",
  "hour",
  "time",
  "authority",
  "giraffe",
  "whistle",
  "dad",
  "pen",
  "approval",
  "nation",
  "smash",
  "anger",
  "print",
  "crown",
  "order",
  "disgust",
  "baby",
  "caption",
  "distribution",
  "banana"
];
const subtitles = [
  "cactus",
  "prove",
  "decorous",
  "gruesome",
  "whip",
  "open",
  "ripe",
  "wish",
  "orde",
  "judicious",
  "help",
  "furtive",
  "like",
  "black-and-white",
  "excellent",
  "cheap",
  "home",
  "worship",
  "bed",
  "surpass"
];

const getRandomDates = (start: Date, end: Date) => {
  const startDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const endDate = new Date(
    startDate.getTime() + Math.random() * (end.getTime() - startDate.getTime())
  );
  return { startDate, endDate };
};

const generateData = (size: number) => {
  const data: SchedulerRowData[] = [];

  for (let i = 0; i <= size; i++) {
    const { startDate, endDate } = getRandomDates(new Date(2023, 0, 1), new Date());
    const { title, subtitle } = getRandomTitleAndSubtitle();
    const item = {
      startDate,
      endDate,
      title,
      subtitle,
      description: "Data description"
    };
    data.push(item);
  }
  return data;
};

const getRandomTitleAndSubtitle = () => {
  const titleIndex = Math.floor(Math.random() * (titles.length - 1) + 1);
  const subtitleIndex = Math.floor(Math.random() * (subtitles.length - 1) + 1);
  return {
    title: titles[titleIndex],
    subtitle: subtitles[subtitleIndex]
  };
};

export const createMockData = (size: number, maxDataLength: number): SchedulerData => {
  const schedulerData: SchedulerData = [];

  for (let i = 0; i < size; i++) {
    const dataLengthToGenerate = Math.floor(Math.random() * (maxDataLength - 1) + 1);
    const data: SchedulerRowData[] = generateData(dataLengthToGenerate);
    const { title, subtitle } = getRandomTitleAndSubtitle();

    const item = {
      label: {
        icon: "icon",
        title,
        subtitle
      },
      data
    };
    schedulerData.push(item);
  }
  return schedulerData;
};
