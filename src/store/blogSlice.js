import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../utils/local-storage-utils';
import { fetchData } from '../services/Api-service';
import { blogsAPILink } from '../constants/api-constants';

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const storedBlogs = JSON.parse(getItemFromLocalStorage('blogs'));
  if (storedBlogs?.length) {
    return storedBlogs;
  } else {
    const data = await fetchData(blogsAPILink);
    return data;
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogsData: [],
    searchTerm: '',
    selectedBlog: null,
    imageLoaded: false,
    showNewBlogModal: false,
    selectedFilters: [],
    editMode: false
  },
  reducers: {
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
      state.blogsData = [action.payload, ...state.blogsData];
      setItemInLocalStorage('blogs', JSON.stringify(state.blogsData));
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
    },
    setEditMode : (state, action) => {
      state.editMode = action.payload;
    }
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlogs.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.blogsData = action.payload;
          state.selectedBlog = action.payload[0];
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
});

export const { setSearchTerm, setSelectedBlog, setImageLoaded, addNewBlog, setShowNewBlogModal, updateSelectedBlog, updateSelectedFilter, setEditMode} = blogSlice.actions;

export default blogSlice.reducer;
