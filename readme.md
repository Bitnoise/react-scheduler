# Usage

In order to display Scheduler properly you need to import _Inter_ font variants first.
You can copy paste code below into your project to import it:

```
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
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
