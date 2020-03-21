import {
	createStore, 
	combineReducers,
	applyMiddleware
} from 'redux';
import thunk from 'redux-thunk'

import reducers from './reducers.js'

export default createStore(
	combineReducers(reducers),
	{
		from: '北京',
		to: '上海',
		isCitySelectorVisible: false,
		currentSelectingLeftCity: false,
		cityData: null,
		isLoadingCityData: false,
		isDateSelectorVisible: false,
		highSpeed: false
	},
	applyMiddleware(thunk)
)
