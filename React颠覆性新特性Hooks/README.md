# Hooks

## 类组件有哪些不足

- 状态逻辑复用难
  - 缺少复用机制
  - render props 和高阶组件导致层级冗余
- 趋向复杂难以维护
  - 生命周期函数混杂不相干逻辑
  - 相干逻辑分散在不同生命周期函数
- this 指向困扰
  - 内涵函数过度创建新句柄
  - 类成员函数不能保证 this

## Hooks 有什么优势

- 函数组件无 this 问题
- 自定义 Hook 方便复用状态逻辑
- 副作用的关注点分离

## 使用 State Hooks

useState 必须按照稳定的顺序、数量调用。  

为了防止出错需要安装 ESlint 插件：eslint-plugin-react-hooks  

配置 ESlint：

```json
{
	"plugins": [
		"react-hooks"
	],
	"rules": {
		"react-hooks/rules-of-hooks": "error"
	}
}
```

延迟初始化的逻辑只会运行一次，提高效率。

```js
useState(() => {
	console.log('initial count')
	return props.defaultCount || 0
})
```

**useState 中 set 相同的值会不会引发重新渲染？**

## 使用 Effect Hooks