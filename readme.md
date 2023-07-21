# @bitnoi.se/scheduler

Typescript oriented, light-weight and ultra fast React Component for creating a gantt charts.

### Installation

```bash
# yarn
yarn add @bitnoi.se/scheduler
# npm
npm install @bitnoi.se/scheduler
```

### Example Usage

1. import required styles for scheduler

```ts
import "@bitnoi.se/react-scheduler/style.css";
```

2. Import Scheduler component into your project

```ts
import { Scheduler } from "@bitnoi.se/scheduler"
import type { SchedulerData } from "@bitnoi.se/scheduler/types/global"

default export function Component() {
	return (
		<section>
			<Scheduler
				data={mockedSchedulerData}
				onRangeChange={(newRange) => console.log(newRange)}
				onItemClick={(clickedResource) => console.log(clickedResource)}
				onFilterData={() => { // some filtering logic }}
			/>
		</section>
	);
}

const mockedSchedulerData: SchedulerData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "JOe Doe",
      subtitle: "Frontend Developer"
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2023-04-13T15:31:24.272Z"),
        endDate: new Date("2023-08-28T10:28:22.649Z"),
        hoursTaken: 3,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
        startDate: new Date("2023-10-07T08:16:31.123Z"),
        endDate: new Date("2023-11-15T21:55:23.582Z"),
        hoursTaken: 1,
        title: "Project B",
        subtitle: "Subtitle B",
        description: "Tuna Home pascal IP drive",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
        startDate: new Date("2023-03-30T22:25:14.377Z"),
        endDate: new Date("2023-09-01T07:20:50.526Z"),
        hoursTaken: 3,
        title: "Project C",
        subtitle: "Subtitle C",
        bgColor: "rgb(254,165,177)"
      },
      {
        id: "b088e4ac-9911-426f-aef3-843d75e714c2",
        startDate: new Date("2023-10-28T10:08:22.986Z"),
        endDate: new Date("2023-10-30T12:30:30.150Z"),
        hoursTaken: 5,
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

| Prop name       | Arguments                         | Description                                                 |
| --------------- | --------------------------------- | ----------------------------------------------------------- |
| `onRangeChange` | updated `startDate` and `endDate` | runs whenever user reaches end of currently rendered canvas |
| `onItemClick`   | clicked resource data             | detects resource click                                      |
| `onFilterData`  | ??                                | ??                                                          |
| `config`        | -                                 | object with scheduler config properties                     |

##### Scheduler Config Object

| Property                 | Default Value | Values            | Description                                                                |
| ------------------------ | ------------- | ----------------- | -------------------------------------------------------------------------- |
| `zoom`                   | 0             | `0` or `1`        | `0` - display grid divided into weeks `1` - display grid divided into days |
| `isFiltersButtonVisible` | `true`        | `true` or `false` | `true` - displays filter button, `false` - hides filter button             |

##### Scheduler Data

array of chart rows
| Property | Type | Description |
| -------- | -------- | ------- |
id | string | uniqe row id |
label | string | row's label, `f.e person's name` |
data | array | array of `resources` |

##### Resource

item that will be visable on the grid as tile
| Property | Type | Description |
| -------- | -------- | ------- |
id | string | unique resource id |
title | string | resource title that will be displayed on resource tile |
subtitle | string (optional) | resource subtitle that will be displayed on resource tile |
description | string (optional) | resource description that will be displayed on resource tile |
startDate | Date | date for calculating start position for resource |
endDate | Date | date for calculating end position for resource |
hoursTaken | number | number of hours resource takes up for given row that will be visible on resource tooltip when hovered |
bgColor | string (optional) | tile color

### Project structure

### Code Style and Guidelines

1. Commits should meet [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules
2. Project uses `eslint` and `prettier` for code linting and styling.
3. Both `husky` and `lint-staged` are used to ensure that code meets code style and guidelines

### How to contribute

- **Reporting Issues**: If you come across any bugs, glitches, or have any suggestions for improvements, please [open an issue](https://github.com/Bitnoise/react-scheduler/issues) on our GitHub repository. Provide as much detail as possible, including steps to reproduce the issue.
- **Suggesting Enhancements**: If you have ideas for new features or enhancements, we would love to hear them! You can [open an issue](https://github.com/Bitnoise/react-scheduler/issues) on our GitHub repository and clearly describe your suggestion.
- **Submitting Pull Requests**: If you have developed a fix or a new feature that you would like to contribute, you can submit a pull request. Here's a quick overview of the process:
  - 1.  Clone the repository and create your own branch: `git checkout -b your-branch-name`.
  - 2.  Implement your changes, following the **code style and guidelines**.
  - 3.  Test your changes to ensure they work as expected.
  - 4.  Commit your changes and push to your forked repository.
  - 5.  Open a pull request against our main repository's `master` branch.
    - add at least 1 reviewer
    - link correct issue

### Development Setup

##### Pre-requirements

- **Node version**: please check `.nvmrc` file for required node version

##### Local setup

To set up the project locally for development and testing, please follow these steps:

1. Clone the repository: `git clone git@github.com:Bitnoise/react-scheduler.git`.
2. Install the dependencies: `yarn install`, depending on your package manager.
3. Start the development server: `yarn dev`. 4. Open http://localhost:5173 in your web browser.

### Troubleshooting

- For using Scheduler with RemixJS make sure to add `@bitnoi.se/scheduler` to `serverDependenciesToBundle` in `remix.config.js` like so:

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

### Contact

If you have any questions or need further assistance, feel free to reach out to us at [bitnoise@bitnoi.se](mailto:email@example.com). We appreciate your contributions and thank you for helping us improve our project!

### License

> Open source license here
