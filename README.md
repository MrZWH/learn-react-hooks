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

### memo 的使用

解决 react 在运行时的效率问题。  

react 就是将数据转换成视图的桥梁，视图应该始终与对应的数据保持同步

```jsx
import {memo} from 'react'

const Foo = memo(function Foo(props) {
  return <div>{props}</div>
})
```

**memo 与 Purecomponent 的属性对比的相等是怎么判断的，是“==”还是“===”，当传入 null 和 undefined 判断是否相等呢？**

## React颠覆性新特性Hooks

- Class 组件有哪些不足？
- Hooks 有什么优势？
- 使用 useState 有哪些需要注意的点？
- 使用 useEffect 使用，第二个参数的用处？
- 使用 Context Hooks, useContext。
- 使用 Memo/Callback Hooks
- 使用 Ref Hooks
- 自定义 Hooks
- Hooks 使用法则
- Hooks 常见问题

[详细内容](./React颠覆性新特性Hooks/README.md)

## React新特性之Redux

顺便完成了一个 todolist 程序推导 Redux api；

[详细内容](./Redux/README.md)

## 渐进式Web App PWA

- Service Worker
- Promise
- fetch
- cache API
- Notification API

[详细内容](./PWA/README.md)

## 火车票业务架构

<https://touch.train.qunar.com>

页面需求

交互设计

在 src 目录下删除除了 service worker 的所有文件.

```shell
ls | grep -v serviceWorker.js| xarges rm
```

安装 normalize.css

## 搭建 Mock Server

安装 express

## 数据结构与模块设计

- React 视觉组件拆分
- redux store 状态涉及
- redux action/reducer 设计

## 火车票首页

类名判断语法:  

```jsx
className={['city-selector', (!show) && 'hidden'].filter(Boolean).join(' ')
```

安装:  
classnames

简写成:  
```jsx
className={classnames('city-selector', {hidden: !show})}
```

安装:  
dayjs 处理时间.

## 搜索结果页

## 座次选择页

## 订单填写页

## 工程优化
