import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import cafeReducer from './cafeReducer'

const store = createStore(cafeReducer)
store.dispatcher = (actionType) => () => store.dispatch({ type: actionType })

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App store={store} />)

renderApp()
store.subscribe( renderApp )
