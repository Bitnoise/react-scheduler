# Usage

In order to display Scheduler properly it's required to import styles:

```ts
import "@bitnoi.se/react-scheduler/style.css";
```

Or you can import it differently from [here](https://fonts.google.com/specimen/Inter?query=Inter).

> Minimum required variants: **400**, **600**

# How to test locally

```bash
cd YOUR_PROJECT
cd node_modules/react
yarn link
cd ../react-dom
yarn link

cd react-scheduler
yarn link
yarn install
yarn link react
yarn link react-dom

cd YOUR_PROJECT
yarn link "@bitnoi.se/react-scheduler"
```
