import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import membersReducer from './membersSlice';
import themeReducer from './themeSlice';
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    members: membersReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
