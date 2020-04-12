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
		trainNumber: null,
		departStation: null,
		arriveStation: null,
		seatType: null,
		departDate: Date.now(),
		arriveDate: Date.now(),
		departTimeStr: null,
		arriveTimeStr: null,
		durationStr: null,
		price: null,
		passengers: [],
		menu: null,
		isMenuVisible: false,
		searchParsed: false,
	},
	applyMiddleware(thunk)
)