<div align="center">
  <img src="logo.svg" style="height: 60px" alt="@bitnoise/react-scheduler">
  <hr />
  <p align="center">
    ✨ <a href="https://scheduler.bitnoise.pl/">https://scheduler.bitnoise.pl/</a> ✨
    <br/>
    Open sourced, typescript oriented, light-weight, and ultra fast React Component for creating gantt charts.
  </p>
  <div align="center">
    <a href="https://bit.ly/react_scheduler">Youtube Tutorial</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://www.npmjs.com/package/@bitnoi.se/react-scheduler">npm</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://github.com/Bitnoise/react-scheduler/issues/new">Report an issue</a>
  </div>
</div>
<hr />

### Installation

```bash
# yarn
yarn add '@bitnoi.se/react-scheduler'
# npm
npm install '@bitnoi.se/react-scheduler'
```

### Example usage

1. import required styles for scheduler

```ts
import "@bitnoi.se/react-scheduler/dist/style.css";
```

2. Import Scheduler component into your project

```ts
import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";

default export function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);

  return (
    <section>
      <Scheduler
        data={mockedSchedulerData}
        isLoading={isLoading}
        onRangeChange={(newRange) => console.log(newRange)}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          // Some filtering logic...
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
          setFilterButtonState(0)
        }}
        config={{
          zoom: 0,
          filterButtonState,
        }}
      />
    </section>
  );
}

const mockedSchedulerData: SchedulerData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "Joe Doe",
      subtitle: "Frontend Developer"
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2023-04-13T15:31:24.272Z"),
        endDate: new Date("2023-08-28T10:28:22.649Z"),
        occupancy: 3600,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
        startDate: new Date("2023-10-07T08:16:31.123Z"),
        endDate: new Date("2023-11-15T21:55:23.582Z"),
        occupancy: 2852,
        title: "Project B",
        subtitle: "Subtitle B",
        description: "Tuna Home pascal IP drive",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
        startDate: new Date("2023-03-30T22:25:14.377Z"),
        endDate: new Date("2023-09-01T07:20:50.526Z"),
        occupancy: 1800,
        title: "Project C",
        subtitle: "Subtitle C",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "b088e4ac-9911-426f-aef3-843d75e714c2",
        startDate: new Date("2023-10-28T10:08:22.986Z"),
        endDate: new Date("2023-10-30T12:30:30.150Z"),
        occupancy: 11111,
        title: "Project D",
        subtitle: "Subtitle D",
        description: "Garden heavy an software Metal",
        bgColor: "rgb(254,165,177)"
      }
    ]
  }
];

```

3. If some problems occur, please see our troubleshooting section below.

### Scheduler API

##### Scheduler Component Props

| Property Name     | Type       | Arguments                         | Description                                                                                                                       |
| ----------------- | ---------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| isLoading         | `boolean`  | -                                 | shows loading indicators on scheduler                                                                                             |
| onRangeChange     | `function` | updated `startDate` and `endDate` | runs whenever user reaches end of currently rendered canvas                                                                       |
| onTileClick       | `function` | clicked resource data             | detects resource click                                                                                                            |
| onItemClick       | `function` | clicked left column item data     | detects item click on left column                                                                                                 |
| onFilterData      | `function` | -                                 | callback firing when filter button was clicked                                                                                    |
| onClearFilterData | `function` | -                                 | callback firing when clear filters button was clicked (clearing button is visible **only** when filterButtonState is set to `>0`) |
| config            | `Config`   | -                                 | object with scheduler config properties                                                                                           |

##### Scheduler Config Object

| Property Name                        | Type         | Default | Description                                                                                                                                                            |
| ------------------------------------ | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| zoom                                 | `0` or `1`   | 0       | `0` - display grid divided into weeks `1` - display grid divided into days                                                                                             |
| filterButtonState                    | `number`     | 0       | `< 0` - hides filter button, `0` - state for when filters were not set, `> 0` - state for when some filters were set (allows to also handle `onClearFilterData` event) |
| maxRecordsPerPage                    | `number`     | 50      | number of items from `SchedulerData` visible per page                                                                                                                  |
| lang                                 | `en` or `pl` | en      | scheduler's language                                                                                                                                                   |
| includeTakenHoursOnWeekendsInDayView | `boolean`    | `false` | show weekends as taken when given resource is longer than a week                                                                                                       |

##### Scheduler Data

array of chart rows with shape of
| Property Name | Type | Description |
| -------- | --------------------- | -------------------------------- |
| id | `string` | unique row id |
| label | `SchedulerRowLabel` | row's label, `e.g person's name, surname, icon` |
| data | `Array<ResourceItem>` | array of `resources` |

##### Left Colum Item Data

data that is accessible as argument of `onItemClick` callback
| Property Name | Type | Description |
| -------- | --------------------- | -------------------------------- |
| id | `string` | unique row id |
| label | `string` | row's label, `e.g person's name` |

##### Resource Item

item that will be visible on the grid as tile and that will be accessible as argument of `onTileClick` event
| Property Name | Type | Description |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| id | `string` | unique resource id |
| title | `string` | resource title that will be displayed on resource tile |
| subtitle | `string (optional)` | resource subtitle that will be displayed on resource tile |
| description | `string (optional)` | resource description that will be displayed on resource tile |
| startDate | `Date` | date for calculating start position for resource |
| endDate | `Date` | date for calculating end position for resource |
| occupancy | `number` | number of seconds resource takes up for given row that will be visible on resource tooltip when hovered |
| bgColor | `string (optional)` | tile color |

### Troubleshooting

- For using Scheduler with RemixJS make sure to add `@bitnoi.se/react-scheduler` to `serverDependenciesToBundle` in `remix.config.js` like so:

```js
// remix.config.js
/** @type  {import('@remix-run/dev').AppConfig} */
module.exports = {
	// ...
	serverDependenciesToBundle: [..., "@bitnoi.se/react-scheduler"],
};
```

- When using with NextJS (app router) Scheduler needs to be wrapped with component with `use client`

```ts
"use client"
import { Scheduler, SchedulerProps } from "@bitnoi.se/react-scheduler";

default export function SchedulerClient(props: SchedulerProps) {
	return <Scheduler {...props} />;
}

```

- When using with NextJS (pages router) it needs to be imported using `dynamic`:

```ts
import dynamic from "next/dynamic";
const Scheduler = dynamic(() => import("@bitnoi.se/react-scheduler").then((mod) => mod.Scheduler), {
  ssr: false
});
```

### Known Issues

1. No responsiveness
2. Slower performance on Firefox when working with big set of data due to Firefox being slower working with canvas

### How to contribute

- **Reporting Issues**: If you come across any bugs, glitches, or have any suggestions for improvements, please [open an issue](https://github.com/Bitnoise/react-scheduler/issues) on our GitHub repository. Provide as much detail as possible, including steps to reproduce the issue.
- **Suggesting Enhancements**: If you have ideas for new features or enhancements, we would love to hear them! You can [open an issue](https://github.com/Bitnoise/react-scheduler/issues) on our GitHub repository and clearly describe your suggestion.
- **Submitting Pull Requests**: If you have developed a fix or a new feature that you would like to contribute, you can submit a pull request. Here's a quick overview of the process:
  - Clone the repository and create your own branch: `git checkout -b feat/your-branch-name`.
  - Implement your changes, following the **code style and guidelines** from [development.md](development.md).
  - Test your changes to ensure they work as expected.
  - Commit your changes and push to your forked repository.
  - Open a pull request against our main repository's `master` branch.
    - add at least 1 reviewer
    - link correct issue

### Contact

If you have any questions or need further assistance, feel free to reach out to us at [scheduler@bitnoi.se](mailto:scheduler@bitnoi.se). We appreciate your contributions and thank you for helping us improve this project!

### License

MIT Licensed. Copyright (c) Bitnoise 2023.
