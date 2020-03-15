# PWA

继承了 web 天生开放的基因，拥有持续更新、SEO、url 分享等原生APP不具备的特性，这也是PWA 最大的魅力所在，PWA 严格依赖 HTTPS，保证了安全性。

## Service Worker

服务工作线程

- 独立于页面，而常驻内存运行
- 代理网络请求
- 依赖 HTTPS

必须要用 http 协议访问页面，file 环境下不可以运行 service worker

npm 安装 serve 启动 http 服务。

service worker 只是一个单例，不能用构造器创建 service worker

service worker 的上下文中不能访问 DOM、window等全局对象，能访问 self（代表这个service worker 的全局作用域对象），在这个对象上监听事件。  
关于声明周期一共有三种事件：install、activate、fetch

传入的脚本修改，刷新会重新install，但不会立即 activate。

在 install 周期中：  
event.waitUnitl(); // 传入一个 promise，等 promise 执行完毕，install 才真正完成

当传入 self.skipWaiting(),现在只要有 service worker 的脚本有更新，刷新页面之后都会安装并且激活，强行解掉了旧版本的 service worker。

在 activate 中：  
event.waitUnitl();和 install 中的一样。传入 self.clients.claim(),clients指service worker 控制的所有页面，这个方法能让页面在首次加载后同样受到service worker 的控制

除了这三个事件还有 push、sync 事件 

## Promise

Promise.all 的入参可以不是数组。  
`Promise.all('abc')` 会得到什么？

## fetch

```js
const xhr = new XMLHttpRequest();
xhr.responseType = 'json'
xhr.onreadystatechange = () => {
	if (xhr.readyState === 4) {
		if (xhr.status >= 200 && xhr.status <= 300) {
			console.log(xhr.response)
		}
	}
}

xhr.open('GET', 'url', true)

xhr.send(null)
```

fetch 不能提供上传进度的功能，不能主动中断请求。

## cache API

支持资源的缓存系统

- 缓存资源（css/script/img）
- 依赖 Service Worker 代理网络请求
- 支持离线程序运行

在 service worker 上下文中可以设置多个缓存空间，所有缓存空间的集合叫做`caches()`, 这是一个全局对象。打开一个缓存空间使用`caches.open()`, 需要传入一个缓存名字.

在页面上下文和 service worker 上下文都能用.

## Notification API

消息推送，常驻内存, 即使页面关闭了, 只要浏览器进程还在,就依然有弹出通知的途径.  
在页面上下文和 service worker 上下文都能用.

- 依赖用户授权
- 适合在 Service Worker 中推送

在页面上下文:  
Notification 既是一个全局对象也是一个构造函数.  

```js
// 查看是否授权
Notification.permission

// 弹出授权请求
Notification.requestPermission().then(permission => {
	console.log(permission)
})

// 创建一个弹出通知
new Notification("Hello", {
	body: 'this is 副标题'
})
```

在 service worker 不允许弹出授权请求.

```js
self.registration.showNotification('hello')
```

- 通知必须先授权才能弹出
- 授权行为只能发生在页面上下文中, 通过 `new Notification()`
- 在 service worker 通过, `self.registration.showNotification('hello')`

## 如何在项目中开启 PWA

谷歌的现成方案 [workbox](https://developers.google.com/web/tools/workbox)

workbox 提供了 webpack 的插件, create-react-app 已经帮我们配置好了 workbox, `package.json` 里的 `workbox-webpack-plugin`