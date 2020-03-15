const CACHE_NAME = 'cache-v1'

self.addEventListener('install', event => {
	console.log('install', event)
	event.waitUnitl(caches.open(CACHE_NAME).then(cache => {
		cache.addAll([
			'/',
			'./index.css'
		])
	})); // 传入一个 promise，等 promise 执行完毕，install 才真正完成
})
self.addEventListener('activate', event => {
	console.log('activate', event)
	event.waitUnitl(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cacheName => {
			if (cacheName !== CACHE_NAME) {
				return caches.delete(cacheName)
			}
		}))
	}))
})
self.addEventListener('fetch', event => {
	console.log('fetch', event)
	event.respondWith(caches.open(CACHE_NAME).then(cache => {
		return cache.match(event.request).then(response => {
			if (response) {
				return response;
			}

			return fetch(event.request).then(response => {
				// response 是流式的 只能读取一次,为了缓存可读取需要克隆一份
				cache.put(event.request, response.clone())

				return response
			})
		})
	}))
})