import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IBlog {
  id?: number;
  title: string;
  author: string;
  content: string;
}


const initialState: {
  listBlogs: IBlog[],
  isCreatedSuccess: boolean,
  isUpdatedSuccess: boolean,
  isDeletedSuccess: boolean,
} = {
  listBlogs: [],
  isCreatedSuccess: false,
  isUpdatedSuccess: false,
  isDeletedSuccess: false
}


interface IBlogPayload {
  id?: number;
  title: string;
  author: string;
  content: string;
}

// First, create the thunk
export const fetchListBlogs = createAsyncThunk(
  'blogs/fetchByIdStatus',
  async () => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    console.log('data blogs >>> ', data);
    return data;
  },
)

export const createNewBlog = createAsyncThunk(
  'blogs/createNewBlog',
  async (payload: IBlogPayload, thunkAPI) => {

    const res = await fetch("http://localhost:8000/blogs", {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlogs());
    }
    return data;
  },
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (payload: IBlogPayload, thunkAPI) => {


    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...payload,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlogs());
    }
    return data;
  },
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (payload: IBlogPayload, thunkAPI) => {

    console.log('delete blog >>> ', payload);

    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListBlogs());
    return data;
  },
)

export const blogSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCreateBlog(state) {
      state.isCreatedSuccess = false;
    },
    resetUpdateBlog(state) {
      state.isUpdatedSuccess = false;
    },
    resetDeleteBlog(state) {
      state.isDeletedSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
      // Add blog to the state array
      // state.entities.push(action.payload)
      state.listBlogs = action.payload;

    }),
      builder.addCase(createNewBlog.fulfilled, (state, action) => {
        // Add blog to the state array
        // state.entities.push(action.payload)
        state.isCreatedSuccess = true;
      }),
      builder.addCase(updateBlog.fulfilled, (state, action) => {
        state.isUpdatedSuccess = true;
      }),
      builder.addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
      })
  },
})

// Action creators are generated for each case reducer function
export const { resetCreateBlog, resetUpdateBlog, resetDeleteBlog } = blogSlice.actions

export default blogSlice.reducer