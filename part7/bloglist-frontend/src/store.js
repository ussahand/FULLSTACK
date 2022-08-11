import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import toastReducer from './reducers/toastReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    toast: toastReducer,
  } })

export default store