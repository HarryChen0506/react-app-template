# react-app-template

A react application framework.

## frame construction

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
App = react + react-dom + react-redux + axios + react-intl

### init 

``` 

$ npm install -g yarn 全局安装yarn, 如果全局已安装跳过该步骤
$ cd /
$ yarn install
```

### add package

``` 

$ yarn add [package] 安装某个依赖, 并且默认保存到package, 等价于 npm install [package] --save
$ yarn add [package] --dev 在devDependencies 里安装一个或多个包, 等价于 npm install [package] --save-dev
```

### develop

``` 

$ npm run dev
$ npm run dev:mock  // backend api is remote mock data
```

### build

* static files will be built under direct of '/build'

``` 

$ npm run build
```

### code commit

``` 

$ git add .
$ npm run commit
```
