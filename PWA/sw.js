self.addEventListener('install', event => {
	console.log('install', event)
	event.waitUnitl(); // 传入一个 promise，等 promise 执行完毕，install 才真正完成
})
self.addEventListener('activate', event => {
	console.log('activate', event)
})
self.addEventListener('fetch', event => {
	console.log('fetch', event)
})