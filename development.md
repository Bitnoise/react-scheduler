# Contribution

### Development Setup

##### Pre-requirements

- **Node version**: please check `.nvmrc` file for required node version

##### Local setup

To set up the project locally for development and testing, please follow these steps:

1. Clone the repository: `git clone git@github.com:Bitnoise/react-scheduler.git`.
2. Install the dependencies: `yarn install`, depending on your package manager.
3. Start the development server: `yarn dev`.
4. Open http://localhost:5173 in your web browser.

### Project structure

#### General:

```
.
├── src
│   ├── assets
│   ├── components
│   |   ├── ExampleComponent
│   |   ├── AnotherComponent
|   |   └── index.ts
│   ├── constants.ts
│   ├── context
│   ├── locales
│   ├── types
│   ├── utils
```

- **assets** - folder that consists all of the svgs and images used within app
- **components** - folder that has all React components used within app
  - **_ExampleComponent_** - folder with component files, written in camelCase convention
  - **_index.ts_** - file that consists exports of all components e.g.
    ```
    export { default as ExampleComponent } from "./ExampleComponent"
    ```
- **constants** - all constants that are globally used and should not change during usage of app, e.g.: height and width of cell, width of single tile.
- **context** - folder that consists CalendarProvider and LocaleProvider
- **locales** - folder that consists files with translations (currently en / pl / de / lt)
- **types** - folder that consists all global types and type guards
- **utils** - folder that consists all utility functions used within app (e.g. drawing all the grid, data parsers etc.)

#### Example of component folder structure:

```
ExampleComponent
├── ExampleComponent.tsx
├── index.ts
├── styles.ts
├── types.ts
```

Each component should consist of the following files:

- **_[ComponentName].tsx_** - .tsx file named after component name, written in camelCase convention
- **_index.ts_** - file that exports component e.g.:
  ```
  export { default } from "./ExampleComponent";
  ```
- **_styles.ts_** - optional file that consists all styling of the component
- **_types.ts_** - optional file that consists all types of component

### Code Style and Guidelines

1. Commits should meet [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules
2. Project uses `eslint` and `prettier` for code linting and styling.
3. Both `husky` and `lint-staged` are used to ensure that code meets code style and guidelines
