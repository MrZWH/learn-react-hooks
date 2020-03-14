import React, {meomo,useEffect, useState, useCallback} from 'react'
import './App.css';
import {
	createSet,
	createAdd,
	createRemove,
	createToggle
} from './actions.js'

let idSeq = Date.now();

function bindActionCreators(actionCreators, dispatch) {
	const ret = {}

	for(let key in actionCreators) {
		ret[key] = function (...args) {
			dispatch(actionCreators[key](...args))
		}
	}

	return ret

}

const Control = memo(function Control(props) {
	const {addTodo} = props;
	const inputRef = useRef()

	const onSubmit = (e) => {
		e.preventDefault();

		const newText = inputRef.current.value.trim();

		if (newText.length === 0) {
			return;
		}

		addTodo({
			id: ++idSeq,
			text: newText,
			complete: false
		})

		inputRef.current.value = '';
	}

	return (
		<div className="control">
			<h1>todos</h1>
			<form onSubmit={onSubmit}>
				<input
					ref={inputRef}
					type="text"
					className="new-todo"
					placeholder="what need to be done?"
				/>
			</form>
		</div>
	)
});

const TodoItem = memo(function TodoItem(props) {
	const {todo: {
		id, text, complete
	}, removeTodo, toggleTodo} = props

	const onChange = () => {
		toggleTodo(id)
	}

	const onRemove = () => {
		removeTodo(id)
	}

	return (
		<li className="todo-item">
			<input
				type="checkbox"
				onChange={onChange}
				checked={complete}
			/>
			<label className={complete ? 'complete': ''}>{text}</label>
			<button onClick={onRemove}>&#xd7;</button>
		</li>
	)
});

const Todos = memo(function Todos(props) {
	const {todos, removeTodo, toggleTodo} = props;

	return (
		<ul>
			{
				todos.map(todo => {
					return (
						<TodoItem
							key={todo.id}
							todo={todo}
							removeTodo={removeTodo}
							toggleTodo={toggleTodo}
						/>
					)
				})
			}
		</ul>
	)

});

const LS_KEY = '_$-todos_';

function TodoList() {
	const [todos, setTodos] = useState([])

	const addTodo = useCallback((todo) => {
		setTodos((todos) => [...todos, todo])
	}, [])

	const removeTodo = useCallback((id) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== id))
	},[])

	const toggleTodo = useCallback((id) => {
		setTodos((todos) => todos.map(todo => todo.id === id ? {...todo, complete: !todo.complete} : todo))
	}, [])

	const dispatch = useCallback((action) => {
		const {type, payload} = action;
		switch(type) {
			case 'set':
				setTodos(payload)
				break;
			case 'add':
				setTodos((todos) => [...todos, payload])
				break;
			case 'remove':
				setTodos((todos) => todos.filter((todo) => todo.id !== payload))
				break;
			case 'toggle':
				setTodos((todos) => todos.map(todo => todo.id === payload ? {...todo, complete: !todo.complete} : todo))
			  break;
			default:
		}
	}, []);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
		dispatch(createSet(todos))
	},[])

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(todos))
	}, [todos])

	return <div className="todo-list">
		<Control
			{
				...bindActionCreators({
					addTodo: createAdd
				}, dispatch)
			}
		/>
		<Todos
		  {
				...bindActionCreators({
					removeTodo: createRemove,
					toggleTodo: createToggle
				}, dispatch)
			}
		  todos={todos}
		 />
	</div>
}

export default TodoList;