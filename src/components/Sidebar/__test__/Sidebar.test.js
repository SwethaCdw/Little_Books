import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Sidebar from '../Sidebar';
import { setOpenModal } from '../../../store/membersSlice';
import { toggleDarkMode } from '../../../store/themeSlice';

const mockStore = configureStore([]);

describe('Sidebar component', () => {

  let store;

  beforeEach(() => {
    store = mockStore({
      members: { openModal: false },
      theme: { darkMode: false },
      blog: { selectedFilters: [], blogsData: [{ type: 'Technology' }, { type: 'Travel' }] }
    });
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Provider store={store}><Sidebar /></Provider>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders sidebar component', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const littleSpan = screen.getByText('Little');
    const bookSpan = screen.getByText('Book');
  
    expect(littleSpan).toBeInTheDocument();
    expect(bookSpan).toBeInTheDocument();
  });

  test('opens members modal when clicked on "View Members"', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    fireEvent.click(screen.getByText('View Members'));

    expect(store.getActions()).toContainEqual(setOpenModal(true));
  });

  test('toggles theme when clicked on "Switch to Dark Mode"', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    fireEvent.click(screen.getByText('Switch to Dark Mode'));

    expect(store.getActions()).toContainEqual(toggleDarkMode());
  });

  test('updates selected filter when checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    const technologyCheckbox = screen.getByLabelText('Technology Blogs');

    fireEvent.click(technologyCheckbox);
  
    expect(technologyCheckbox.checked).toBe(false);

  });
});
