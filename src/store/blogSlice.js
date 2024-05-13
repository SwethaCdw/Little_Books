import { createSlice } from '@reduxjs/toolkit';
import { BLOG_TYPE } from '../constants/common-constants';
import { setItemInLocalStorage } from '../utils/local-storage-utils';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogsData: [],
    searchTerm: '',
    selectedBlog: null,
    imageLoaded: false,
    showNewBlogModal: false,
    selectedFilters: BLOG_TYPE
  },
  reducers: {
    setBlogsData(state, action) {
      state.blogsData = action.payload;
      setItemInLocalStorage('blogs', JSON.stringify(action.payload));
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
    setImageLoaded(state, action) {
      state.imageLoaded = action.payload;
    },
    addNewBlog: (state, action) => {
      state.blogsData.push(action.payload);
    },
    setShowNewBlogModal: (state, action) => {
      state.showNewBlogModal = action.payload;
    },
    updateSelectedBlog: (state, action) => {
      const updatedBlog = action.payload;
      const index = state.blogsData.findIndex(blog => blog.photo === updatedBlog.photo);
      if (index !== -1) {
        state.blogsData[index] = updatedBlog;
        setItemInLocalStorage('blogs', JSON.stringify(state.blogsData));

      }
      state.selectedBlog = updatedBlog;

    }, 
    updateSelectedFilter : (state, action) => {
      state.selectedFilters = action.payload;
    }
  }
});

export const { setBlogsData, setSearchTerm, setSelectedBlog, setImageLoaded, addNewBlog, setShowNewBlogModal, updateSelectedBlog, updateSelectedFilter} = blogSlice.actions;

export default blogSlice.reducer;
