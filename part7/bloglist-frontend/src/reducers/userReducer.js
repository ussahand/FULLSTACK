import { createSlice } from '@reduxjs/toolkit'
import services from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    resetUser: () => null
  }
})

const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer

export const login = (user) =>
  (dispatch) => {

    user && services.verifyUser(user, dispatch)
      .then(resp => dispatch(setUser(user)))
      .catch(err => dispatch(resetUser()))
  }

export const logout = () =>
  dispatch =>
    dispatch(resetUser())

export const loginSignup = (userInfo) =>
  async dispatch => {
    const loggedinUser = await services.authenticate(userInfo, dispatch)
    window.localStorage.setItem('userInfo', JSON.stringify(loggedinUser))
    dispatch(login(loggedinUser))
  }

