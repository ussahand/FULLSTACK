import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '' }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
    },
    resetNotification(state) {
      state.message = ''
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer