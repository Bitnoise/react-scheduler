<div align="center">
  <img src="logo.svg" style="height: 60px" alt="@code-rhapsodie/react-scheduler/react-scheduler">
  <hr />
  <p align="center">
    ✨ <a href="https://scheduler.bitnoise.pl/">https://scheduler.bitnoise.pl/</a> ✨
    <br/>
    Open sourced, typescript oriented, light-weight, and ultra fast React Component for creating gantt charts.
  </p>
  <div align="center">
    <a href="https://bit.ly/react_scheduler">Youtube Tutorial</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://www.npmjs.com/package/@code-rhapsodie/react-scheduler">npm</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://github.com/code-rhapsodie/react-scheduler/issues/new">Report an issue</a>
  </div>
</div>
<hr />

## About this fork

`@code-rhapsodie/react-scheduler` is a maintained fork of Bitnoise/react-scheduler, published by Code Rhapsodie with ongoing fixes and updates. Credit for the original library goes to the Bitnoise team.

### Installation

```bash
# yarn
yarn add '@code-rhapsodie/react-scheduler'
# npm
npm install '@code-rhapsodie/react-scheduler'
```

### Example usage

1. import required styles for scheduler

```ts
import "@code-rhapsodie/react-scheduler/dist/style.css";
```

2. Import Scheduler component into your project

```ts
import { Scheduler, SchedulerData } from "@code-rhapsodie/react-scheduler";
import dayjs from "dayjs";

default export function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleRangeChange = useCallback((range) => {
    setRange(range);
  }, []);

  // Filtering events that are included in current date range
  // Example can be also found on video https://youtu.be/9oy4rTVEfBQ?t=118&si=52BGKSIYz6bTZ7fx
  // and in the react-scheduler repo App.tsx file https://github.com/Bitnoise/react-scheduler/blob/master/src/App.tsx
  const filteredMockedSchedulerData = mockedSchedulerData.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            // we use "dayjs" for date calculations, but feel free to use library of your choice
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      }))

  return (
    <section>
      <Scheduler
        data={filteredMockedSchedulerData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
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

| Property Name     | Type                      | Arguments                         | Description                                                                                                                       |
| ----------------- | ------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| isLoading         | `boolean`                 | -                                 | shows loading indicators on scheduler                                                                                             |
| onRangeChange     | `function`                | updated `startDate` and `endDate` | runs whenever user reaches end of currently rendered canvas                                                                       |
| onTileClick       | `function`                | clicked resource data             | detects resource click                                                                                                            |
| onItemClick       | `function`                | clicked left column item data     | detects item click on left column                                                                                                 |
| onFilterData      | `function`                | -                                 | callback firing when filter button was clicked                                                                                    |
| onClearFilterData | `function`                | -                                 | callback firing when clear filters button was clicked (clearing button is visible **only** when filterButtonState is set to `>0`) |
| onCellClick       | `function`                | `CellClickData`                   | fired when clicking an empty cell (a resource row on a given date, with no tile) without dragging to another date                 |
| onCellRangeSelect | `function`                | `CellRangeSelectData`             | fired when dragging across several cells of the same resource row, from mouse down to mouse up                                    |
| onTileMove        | `function`                | `TileMoveData`                    | fired when a tile is dragged and dropped onto a new cell. Providing it enables tile drag & drop                                   |
| selectedCell      | `SelectedRange` or `null` | -                                 | cell or range of cells to highlight on the grid, e.g. the last selection made via `onCellClick` / `onCellRangeSelect`             |
| config            | `Config`                  | -                                 | object with scheduler config properties                                                                                           |

##### Scheduler Config Object

---

| Property Name                        | Type                                                             | Default     | Description                                                                                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| zoom                                 | `0` or `1` or `2`                                                | 0           | `0` - display grid divided into weeks `1` - display grid divided into days `2` - display grid divided into hours                                                       |
| filterButtonState                    | `number`                                                         | 0           | `< 0` - hides filter button, `0` - state for when filters were not set, `> 0` - state for when some filters were set (allows to also handle `onClearFilterData` event) |
| maxRecordsPerPage                    | `number`                                                         | 50          | number of items from `SchedulerData` visible per page                                                                                                                  |
| lang                                 | `en`, `es`, `lt`, `de`, `fr`, `it`, `pt-BR`, `he` , `ro` or `pl` | en          | scheduler's language                                                                                                                                                   |
| includeTakenHoursOnWeekendsInDayView | `boolean`                                                        | `false`     | show weekends as taken when given resource is longer than a week                                                                                                       |
| showTooltip                          | `boolean`                                                        | `true`      | show tooltip when hovering over tiles                                                                                                                                  |
| translations                         | `LocaleType[]`                                                   | `undefined` | option to add specific langs translations                                                                                                                              |
| showThemeToggle                      | `boolean`                                                        | `false`     | show toggle button to switch between light/dark mode                                                                                                                   |
| defaultTheme                         | `light` or `dark`                                                | `light`     | scheduler's default theme                                                                                                                                              |
| onThemeChange                        | `(mode: "light" \| "dark") => void`                              | `undefined` | called when the theme toggle switches the theme, e.g. to persist the user's choice                                                                                     |

#### Translation object example

```ts
import enDayjsTranslations from "dayjs/locale/en";

const langs: LocaleType[] = [
  {
    id: "en",
    lang: {
      feelingEmpty: "I feel so empty...",
      free: "Free",
      loadNext: "Next",
      loadPrevious: "Previous",
      over: "over",
      taken: "Taken",
      topbar: {
        filters: "Filters",
        next: "next",
        prev: "prev",
        today: "Today",
        view: "View",
        zoomLevels: ["Weeks", "Days", "Hours"],
        toggleTheme: "Toggle theme"
      },
      search: "search",
      week: "week"
    },
    translateCode: "en-EN",
    dayjsTranslations: enDayjsTranslations
  }
];

<Scheduler
  // ... //
  config={{
    lang: "en",
    translations: langs
  }}
/>;
```

#### Scheduler LocaleType Object

| Property Name     | Type                       | Description                        |
| ----------------- | -------------------------- | ---------------------------------- |
| id                | `string`                   | key is needed for selecting lang   |
| lang              | `Translation`              | object with translations           |
| translateCode     | `string`                   | code that is saved in localStorage |
| dayjsTranslations | `string ILocale undefined` | object with translation from dayjs |

#### Scheduler Translation Object

| Property Name | Type     |
| ------------- | -------- |
| feelingEmpty  | `string` |
| free          | `string` |
| loadNext      | `string` |
| loadPrevious  | `string` |
| over          | `string` |
| taken         | `string` |
| search        | `string` |
| week          | `string` |
| topbar        | `Topbar` |

##### Scheduler Topbar Object

| Property Name | Type                  | Description                                                                              |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------- |
| filters       | `string`              | label of the filter button                                                               |
| next          | `string`              | label of the next period button                                                          |
| prev          | `string`              | label of the previous period button                                                      |
| today         | `string`              | label of the today button                                                                |
| view          | `string`              | accessible label of the zoom level selector                                              |
| zoomLevels    | `string[] (optional)` | labels of the zoom levels, from weeks to hours. Defaults to `["Weeks", "Days", "Hours"]` |
| toggleTheme   | `string (optional)`   | label of the theme toggle button. Defaults to `"Toggle theme"`                           |

##### Scheduler Data

array of chart rows with shape of

| Property Name | Type                  | Description                                     |
| ------------- | --------------------- | ----------------------------------------------- |
| id            | `string`              | unique row id                                   |
| label         | `SchedulerRowLabel`   | row's label, `e.g person's name, surname, icon` |
| data          | `Array<ResourceItem>` | array of `resources`                            |

##### Left Colum Item Data

data that is accessible as argument of `onItemClick` callback

| Property Name | Type                | Description                                     |
| ------------- | ------------------- | ----------------------------------------------- |
| id            | `string`            | unique row id                                   |
| label         | `SchedulerRowLabel` | row's label, `e.g person's name, surname, icon` |

##### Resource Item

item that will be visible on the grid as tile and that will be accessible as argument of `onTileClick` event

| Property Name | Type                       | Description                                                                                                                             |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `string`                   | unique resource id                                                                                                                      |
| title         | `string`                   | resource title that will be displayed on resource tile                                                                                  |
| subtitle      | `string (optional)`        | resource subtitle that will be displayed on resource tile                                                                               |
| description   | `string (optional)`        | resource description that will be displayed on resource tile                                                                            |
| startDate     | `Date`                     | date for calculating start position for resource                                                                                        |
| endDate       | `Date`                     | date for calculating end position for resource                                                                                          |
| occupancy     | `number`                   | number of seconds resource takes up for given row that will be visible on resource tooltip when hovered                                 |
| bgColor       | `string (optional)`        | tile color, as hex (`#rgb`, `#rrggbb`) or `rgb()` / `rgba()`. The text is dark or white depending on it                                 |
| draggable     | `boolean (optional)`       | whether the tile can be dragged when `onTileMove` is provided. Defaults to `true`                                                       |
| style         | `CSSProperties (optional)` | additional inline styles applied to the tile (e.g. `backgroundImage`, or `color` to force the text colour), overriding the default ones |

### Cell selection and drag & drop

The scheduler supports selecting empty cells and rescheduling tiles by dragging them. These interactions are opt-in: they are only enabled when the matching callbacks are provided.

- **Cell click / range selection**: pressing the mouse on the grid and releasing it on the same cell fires `onCellClick`; dragging across several cells of the same resource row fires `onCellRangeSelect` (the range can be dragged in either direction, `startDate` is always the earliest date). While dragging, the selected range is highlighted.
- **Highlighting a selection**: the scheduler does not keep the selection itself. Pass it back through the `selectedCell` prop to keep it highlighted (set it to `null` to clear it).
- **Tile drag & drop**: when `onTileMove` is provided, every tile becomes draggable (unless its `draggable` property is set to `false`). While dragging, a ghost preview shows where the tile will land. On drop, `onTileMove` receives the new resource and dates: the tile keeps its original duration and the point where it was grabbed is preserved. The scheduler does not update its data by itself, so update your `data` in the callback.

```tsx
import {
  Scheduler,
  SchedulerData,
  CellClickData,
  CellRangeSelectData,
  SelectedRange,
  TileMoveData
} from "@code-rhapsodie/react-scheduler";

export default function Component() {
  const [data, setData] = useState<SchedulerData>(mockedSchedulerData);
  const [selectedCell, setSelectedCell] = useState<SelectedRange | null>(null);

  const handleCellClick = ({ resourceId, date }: CellClickData) =>
    setSelectedCell({ resourceId, startDate: date, endDate: date });

  const handleCellRangeSelect = (range: CellRangeSelectData) => setSelectedCell(range);

  const handleTileMove = ({
    id,
    previousResourceId,
    resourceId,
    startDate,
    endDate
  }: TileMoveData) =>
    setData((rows) => {
      const tile = rows
        .find((row) => row.id === previousResourceId)
        ?.data.find((item) => item.id === id);
      if (!tile) return rows;

      return rows.map((row) => {
        const items = row.data.filter((item) => item.id !== id);
        return row.id === resourceId
          ? { ...row, data: [...items, { ...tile, startDate, endDate }] }
          : { ...row, data: items };
      });
    });

  return (
    <Scheduler
      data={data}
      onCellClick={handleCellClick}
      onCellRangeSelect={handleCellRangeSelect}
      onTileMove={handleTileMove}
      selectedCell={selectedCell}
    />
  );
}
```

##### Cell Click Data

argument of `onCellClick` callback

| Property Name | Type     | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| resourceId    | `string` | id of the resource (row) the cell belongs to |
| date          | `Date`   | date represented by the clicked cell         |

##### Cell Range Select Data

argument of `onCellRangeSelect` callback, same shape as the `SelectedRange` accepted by the `selectedCell` prop

| Property Name | Type     | Description                                   |
| ------------- | -------- | --------------------------------------------- |
| resourceId    | `string` | id of the resource (row) the range belongs to |
| startDate     | `Date`   | first date of the selected range              |
| endDate       | `Date`   | last date of the selected range               |

##### Tile Move Data

argument of `onTileMove` callback

| Property Name      | Type     | Description                                                   |
| ------------------ | -------- | ------------------------------------------------------------- |
| id                 | `string` | id of the moved resource item                                 |
| previousResourceId | `string` | id of the resource (row) the tile was dragged from            |
| resourceId         | `string` | id of the resource (row) the tile was dropped onto            |
| startDate          | `Date`   | new start date, shifted by the amount the tile was dragged by |
| endDate            | `Date`   | new end date, keeping the tile's original duration            |

All these types (`CellClickData`, `CellRangeSelectData`, `SelectedRange`, `TileMoveData`) are exported from the package.

### Navigation transitions

Moving to the previous or next period with the top bar buttons now plays a short slide animation on the grid, in the direction of the navigation.

Scrolling horizontally loads the previous or next period shortly before reaching the edge of the grid, once the scroll (including the momentum of a swipe) has settled, and keeps the visible dates in place while the new columns are added, so the scroll stays continuous. `onRangeChange` is called with the new range. Loading does not block the infinite scroll: when the scroll goes past the range being loaded, `onRangeChange` is called again with the new range while `isLoading` is still `true`, so cancel or ignore the pending request (for example with an `AbortController`) to only display the data of the latest range.

### Mobile layout

Below 768px wide, the scheduler switches to a compact layout: narrower day columns and left column, avatars hidden, the search field collapsed into a button, and the previous / next buttons, zoom selector and theme toggle hidden from the top bar. The rows can still be scrolled horizontally.

### Troubleshooting

- For using Scheduler with RemixJS make sure to add `@code-rhapsodie/react-scheduler` to `serverDependenciesToBundle` in `remix.config.js` like so:

```js
// remix.config.js
/** @type  {import('@remix-run/dev').AppConfig} */
module.exports = {
	// ...
	serverDependenciesToBundle: [..., "@code-rhapsodie/react-scheduler"],
};
```

- When using with NextJS (app router) Scheduler needs to be wrapped with component with `use client`

```ts
"use client"
import { Scheduler, SchedulerProps } from "@code-rhapsodie/react-scheduler";

default export function SchedulerClient(props: SchedulerProps) {
	return <Scheduler {...props} />;
}

```

- When using with NextJS (pages router) it needs to be imported using `dynamic`:

```ts
import dynamic from "next/dynamic";
const Scheduler = dynamic(
  () => import("@code-rhapsodie/react-scheduler").then((mod) => mod.Scheduler),
  {
    ssr: false
  }
);
```

- How to customize Scheduler dimensions

Scheduler is position absolutely to take all available space. If you want to have fixed dimensions wrap Scheduler inside a div with position set to relative.

Example using styled components:

```ts
export const StyledSchedulerFrame = styled.div`
  position: relative;
  height: 40vh;
  width: 40vw;
`;

<StyledSchedulerFrame>
    <Scheduler  {...}/>
</StyledSchedulerFrame>
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
