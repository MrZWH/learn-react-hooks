# React劲爆新特性Hooks 重构旅游电商网站火车票PWA

React 最大的贡献并不是作为业务解决方案，而是 React 团队每一次技术迭代带给我们新的 理念、方法和理论。

用来 Class 来声明组件的问题：

- 难以复用的状态逻辑
- 难以捉摸的生命周期
- 混乱的副作用

目标：精于使用 React Hooks 作为未来新的组件开发方式

没有 constructor、`this.setState` componentDidMount render  

## 前置准备

- 工具类
- 语法类
- 概念类
- 效率类
- 原则类

### 工具类

- node
  - 建立在v8之上
  - 异步事件驱动
  - 广泛应用于前端工具化
- npm
  - JavaScript 模块化规范
  - 模块托管服务 <https://www.npmjs.com/>
  - 意外应用于浏览器端代码共享
- webpack
  - 实则为“模块打包器”
  - 演化为构建工具
- eslint
- prettier

### 语法类

- ECMAScript 2015+
- JSX
- CSS flex

### 概念类

- SPA/MPA
  - 异步接口通信
  - 纯前端渲染
  - 解耦前后协作
- PWA
  - 渐进式网络应用
  - 可控的静态缓存
  - 离线访问能力
  - 优化载入速度

### 效率类

- iconfont
  - 衍生于 webfont。很久以前只能使用操作系统预设的字体，无法保证页面效果的一致性
  - 自定义文字图形
  - 仅限于单色图标
- snippets
  - 代码片段

### 原则类

工程化的视角看待问题。

- 职责分离
  - 单一职责，职能分解
  - 模块解耦
  - 优化可维护性

## 项目搭建

which npx 查找命令路径

npx create-react-app train-ticket

### react-scripts 及其工作原理

### 用 eject 解构编译脚本

## React新特性一览

- Context
- ContextType
- lazy
- Suspense
- memo
  
### Context

Context 提供了一种方式，能让数据在组件树中传递而不必一级一级手动传递。

一个 Context 实例对象会派生出两个组件：`<Provider>`,`<Consumer>`。  

如何创建 context 实例对象？  
`createContext(defaultValue?)`

可以有任意多个context，组件嵌套。

### React 中 contextType 的使用

context 会让组件变得不纯粹，因为依赖了全局变量。

省去 Consumer 组件的方式。

```js
const Context = createContext();

// ...

static contextType = Context;

render() {
  const context = this.content
  return ()
}
```

### lazy 和 Suspense 的使用

```js
import {lazy, Suspense} from 'react'

const About = lazy(() => import(/* webpackChunkName: "about"*/))
```

当 lazy 加载的组件出现错误时 Susupense 并不会捕获错误。

react 中有 ErrorBoundary的概念，利用的是 componentDidCatch 生命周期函数，也可以使用静态方法 `static getDerivedStateFromError` 该函数返回新的 state

## React颠覆性新特性Hooks

## React新特性之Redux

## 渐进式Web App

## 火车票业务架构

## 火车票首页

## 搜索结果页

## 座次选择页

## 订单填写页

## 工程优化
