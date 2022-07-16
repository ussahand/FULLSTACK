import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }
const filterSilce = createSlice({
  name: 'filter',
  initialState,
  reducers:{
    setFilter(state, { payload }) {
      state.value = payload
    },
    resetFilter(state) {
      state.value = ''
    }
  }
})

export const { setFilter, resetFilter } = filterSilce.actions
export default filterSilce.reducer