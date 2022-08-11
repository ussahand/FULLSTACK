import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// const initialState = [{title:'blogs redux', author:'me', url:'www', likes: '2'}]
const initialState = []
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    blgCreate(state, action) {
      state.push(action.payload)
    },

    // blogsLoad(state, action) { state.push(...action.payload) },
    blogsLoad: (state, { payload }) => state.concat(payload),

    blgUpdate(state, { payload }) {
      return state.map(x => x.id === payload.id ? payload : x)
    },
    blgDelete(state, { payload }) {
      const index = state.findIndex(x => x.id === payload)
      state.splice(index, 1)
      // return []
    },
    blogsReset: () => [],

    addComment(state, action) {
      const { blogId, comment } = action.payload
      return state.map(blog => blog.id === blogId
        ? { ...blog, comments: [...blog.comments, comment] }
        : blog
      )
    }
  }
})

export const { blgCreate, blogsReset, blgUpdate, blgDelete, blogsLoad, addComment } = blogsSlice.actions
export default blogsSlice.reducer

export const blogDelete = (blogId) =>
  (dispatch, getstate) => {
    const state = getstate()
    blogService.delBlog(blogId, state.user, dispatch)
      .then(resp => dispatch(blgDelete(blogId)))
      .catch(err => console.log('del resp', err))
  }

export const blogCreate = (blogInfo) =>
  async (dispatch, getState) => {
    const user = getState().user
    const createdBlog = await blogService.postBlog(user, dispatch, blogInfo)
    createdBlog && dispatch(blgCreate(createdBlog))
  }

export const blogUpdate = (updatedBlog, blogId) =>
  async (dispatch, getState) => {
    const state = getState()
    const editedBlog = await blogService.editBlog(blogId, state.user, dispatch, updatedBlog)
    editedBlog && dispatch(blgUpdate(editedBlog))
    //  editedBlog && toggleAddEditBox(-2)
  }

export const commentCreate = (blogId, comment) =>
  async (dispatch, getState) => {
    const createdComment = await blogService.postComment(dispatch, blogId, { comment })
    createdComment && dispatch(addComment({ blogId, comment: createdComment }))
  }  