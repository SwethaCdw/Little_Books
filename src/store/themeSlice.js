import { createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../utils/local-storage-utils';

const initialState = {
  darkMode: getItemFromLocalStorage('darkMode'),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
      setItemInLocalStorage('darkMode', state.darkMode);
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;