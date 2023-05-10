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

const generateData = (amount: number, year: number, amountOfDscWords: number) => {
  const data: SchedulerRowData[] = [];

  for (let i = 0; i < amount; i++) {
    const { startDate, endDate } = getRandomDates(year);
    const item = {
      startDate,
      endDate,
      title: getRandomWords(),
      subtitle: getRandomWords(),
      description: getRandomWords(amountOfDscWords)
    };
    data.push(item);
  }
  return data;
};

export const createMockData = (
  amount: number,
  year: number,
  amountOfDscWords = 5
): SchedulerData => {
  const schedulerData: SchedulerData = [];

  for (let i = 0; i < amount; i++) {
    const data: SchedulerRowData[] = generateData(amount, year, amountOfDscWords);

    const item = {
      label: {
        icon: "icon",
        title: getRandomWords(),
        subtitle: getRandomWords()
      },
      data
    };
    schedulerData.push(item);
  }
  return schedulerData;
};
