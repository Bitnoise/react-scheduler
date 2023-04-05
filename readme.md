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
