import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IUser {
  id: number,
  name: string,
  email: string
}


const initialState: {
  listUsers: IUser[],
  isCreatedSuccess: boolean,
  isUpdatedSuccess: boolean,
} = {
  listUsers: [],
  isCreatedSuccess: false,
  isUpdatedSuccess: false,
}


interface IUserPayload {
  id?: number;
  name: string;
  email: string;
}

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  },
)

export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (payload: IUserPayload, thunkAPI) => {

    const res = await fetch("http://localhost:8000/users", {
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
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  },
)

export const updateUser = createAsyncThunk(
  'users/updateUser', 
  async (payload: IUserPayload, thunkAPI) => {

    console.log('payload update >>> ', payload);

    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
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
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  },
)

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCreateUser(state) {
      state.isCreatedSuccess = false;
    },
    resetUpdateUser(state) {
      state.isUpdatedSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
      state.listUsers = action.payload;

    }),
      builder.addCase(createNewUser.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload)
        state.isCreatedSuccess = true;
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdatedSuccess = true;
      })
  },
})

// Action creators are generated for each case reducer function
export const { resetCreateUser, resetUpdateUser } = userSlice.actions

export default userSlice.reducer