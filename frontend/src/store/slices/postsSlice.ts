import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  trigger: {
    count: number;
  };
}

const initialState: PostsState = {
  trigger: {
    count: 0
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.trigger = {
        count: state.trigger.count + 1
      };
    },
  },
});

export const { triggerRefresh } = postsSlice.actions;
export default postsSlice.reducer;
