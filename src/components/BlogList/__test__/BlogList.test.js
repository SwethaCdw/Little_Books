import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BlogList from '../BlogList';

const mockStore = configureStore([]);

describe('BlogList component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      blog: {
        blogsData: [
          { title: 'Blog 1', type: 'Type 1', details: 'Details 1' },
          { title: 'Blog 2', type: 'Type 2', details: 'Details 2' },
        ],
        searchTerm: '',
        selectedBlog: { title: 'Blog 1', type: 'Type 1', details: 'Details 1' },
        imageLoaded: true,
        showNewBlogModal: false,
        selectedFilters: ['Type 1', 'Type 2'],
      },
      theme: {
        darkMode: false,
      },
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Provider store={store}><BlogList /></Provider>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the blog list correctly', () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    expect(screen.getByText('Blog 2')).toBeInTheDocument();
  });

  it('should handle blog click', () => {
    render(
      <Provider store={store}>
        <BlogList />
      </Provider>
    );

    const blogItem = screen.getByText('Blog 2');

    fireEvent.click(blogItem);

    const expectedAction = { type: 'blog/setSelectedBlog', payload: { title: 'Blog 2', type: 'Type 2', details: 'Details 2' } };
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('displays no blogs found message when filtered blogs are empty', () => {
    const emptyStore = mockStore({
      blog: {
        blogsData: [],
        searchTerm: '',
        selectedBlog: null,
        imageLoaded: true,
        showNewBlogModal: false,
        selectedFilters: [],
      },
      theme: {
        darkMode: false,
      },
    });
    render(
      <Provider store={emptyStore}>
        <BlogList />
      </Provider>
    );
    expect(screen.getByText('No blogs found.')).toBeInTheDocument();
  });



 
});
