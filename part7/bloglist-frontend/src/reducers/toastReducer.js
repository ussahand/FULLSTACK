import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'notification',
  initialState : { message:{ text: '', status: 'NONE' }, timeoutId: null },
  reducers: {
    toast (state, action) {
      state.timeoutId && clearTimeout(state.timeoutId)
      return action.payload
    },

    reset: () => ({ message:{ text: '', status: 'NONE' }, timeoutId: null }),
  }

})

const { toast, reset } = toastSlice.actions
export default toastSlice.reducer

export const notify = (text, status) =>
  async toastDispatch => {
    const timeOut = {
      SUCCESS: 3000, //mili second
      FAILURE: 5000,
      WARNING: 3500,
    }

    const message = {text, status}

    const timeoutId = setTimeout(() => toastDispatch(reset()), timeOut[message.status])
    toastDispatch(toast({ message, timeoutId }))
  }

