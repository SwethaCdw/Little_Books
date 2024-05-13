import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import membersReducer from './membersSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    members: membersReducer,
    theme: themeReducer
  }
});

export default store;
