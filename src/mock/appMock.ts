import { faker } from "@faker-js/faker";
import { SchedulerData, SchedulerRowData } from "@/types/global";
export const mockedOnRangeChange = () => {
  console.log("Mocked on range change has been triggered");
};

const getRandomWords = (amount?: number) =>
  amount ? faker.random.words(amount) : faker.random.word();

const getRandomDates = (year: number) => {
  const startDate = faker.date.between(new Date(year, 0, 1), new Date(year + 1, 0, 1));
  const endDate = faker.date.between(startDate, new Date(year + 1, 0, 1));
  return { startDate, endDate };
};

const generateData = (year: number, amountOfDscWords: number, hasMultipleProjects: boolean) =>
  new Array(hasMultipleProjects ? 2 : 1).map(() => {
    const { startDate, endDate } = getRandomDates(year);
    return {
      startDate,
      endDate,
      title: getRandomWords(),
      subtitle: getRandomWords(),
      description: getRandomWords(amountOfDscWords)
    };
  });

export const createMockData = (
  amount: number,
  year: number,
  amountOfDscWords = 5
): SchedulerData => {
  const schedulerData: SchedulerData = [];

  for (let i = 0; i < amount; i++) {
    const hasMultipleProjects = faker.datatype.boolean();
    const data: SchedulerRowData[] = generateData(year, amountOfDscWords, hasMultipleProjects);

    const item = {
      label: {
        icon: "https://picsum.photos/24",
        title: getRandomWords(),
        subtitle: getRandomWords()
      },
      data
    };
    schedulerData.push(item);
  }
  return schedulerData;
};
