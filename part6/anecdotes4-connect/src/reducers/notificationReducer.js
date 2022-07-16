import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timeId: null }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showMessage(state, action) {
      state.timeId && clearTimeout(state.timeId) // remove previous setTimeout
      return action.payload
    },
    hideMessage(state) {
      state.message = ''
    }
  }
})

const { showMessage, hideMessage } = notificationSlice.actions

export const setNotification = (message, delay) => // delay is in second
  dispatch => {
    const timeId = setTimeout(() => dispatch(hideMessage()) , delay * 1000)
    dispatch(showMessage({ message, timeId }))
  }

export default notificationSlice.reducer
