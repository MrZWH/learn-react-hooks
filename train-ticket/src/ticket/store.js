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
		departDate: Date.now(),
		arriveDate: Date.now(),
		departTimeStr: null,
		arriveTimeStr: null,
		departStation: null,
		arriveStation: null,
		trainNumber: null,
		durationStr: null,
		tickets: [],
		isScheduleVisible: false,
		searchParsed: false,
	},
	applyMiddleware(thunk)
)