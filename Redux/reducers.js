const reducers = {
	todos(state, action) {
		const {type, payload} = action;
		switch(type) {
			case 'set':
				return payload
			case 'add':
				return [...state, payload]
			case 'remove':
				return state.filter((todo) => todo.id !== payload)
			case 'toggle':
				return state.map(todo => todo.id === payload ? {...todo, complete: !todo.complete} : todo)
		}

		return state
	},
	incrementCount(state, action) {
		const {type} = action;
		switch(type) {
			case 'set':
			case 'add':
				return state + 1
		}
		return state;
	}
}

function combineReducers(reducers) {
	return function reducer(state, action) {
		const changed = {}

		for(let key in reducers) {
			changed[key] = reducers[key](state[key], action)
		}

		return {
			...state,
			...changed
		}

	}
}

export default combineReducers(reducers);
