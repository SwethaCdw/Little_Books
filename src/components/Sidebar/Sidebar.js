
import React from 'react';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../../store/membersSlice';
import Members from '../Members/Members';
import { toggleDarkMode } from '../../store/themeSlice';
import { updateSelectedFilter } from '../../store/blogSlice';
import { BLOGS, FILTER, LOGO_NAME1, LOGO_NAME2, SWITCH_TO_DARK_MODE, SWITCH_TO_LIGHT_MODE, VIEW_MEMBERS } from '../../constants/sidebar-constants';

const Sidebar = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.members.openModal)
  const darkMode = useSelector((state) => state.theme.darkMode);
  const selectedFilters = useSelector((state) => state.blog.selectedFilters);
  const blogsData = useSelector((state) => state.blog.blogsData);
  const types = [...new Set(blogsData.map(blog => blog.type))].sort();

  const openMembersModal = () => {
    dispatch(setOpenModal(true));
  }

  const handleModalClose = () => {
    dispatch(setOpenModal(false));
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode()); 
  };

  const handleCheckboxChange = (type) => {
    const updatedTypes = selectedFilters.includes(type)
      ? selectedFilters.filter((selectedType) => selectedType !== type)
      : [...selectedFilters, type];
      dispatch(updateSelectedFilter(updatedTypes));
  };


  return (
    <>
   
   <div className={`sidebar-container ${darkMode ? 'dark-mode' : ''}`}>
        <p className='logo'><span>{LOGO_NAME1}</span> <span>{LOGO_NAME2}</span></p>
        <div >
          <ul className='filter-items'>
            <h4 className='filter-heading'>{FILTER}</h4>
          {types.map((type) => (
            <label key={type}>
              <li >
                  <input
                    type='checkbox'
                    checked={selectedFilters.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                  />
                  <p className='filter-item'>{type} {BLOGS}</p>
              </li>
              </label>
            ))}
          </ul>

        </div>
        <div className='buttons'>
            <p className='view-members' onClick={openMembersModal}>{VIEW_MEMBERS}</p>
            <p className='app-theme' onClick={handleThemeToggle}>
              {darkMode ? SWITCH_TO_LIGHT_MODE : SWITCH_TO_DARK_MODE}
            </p>
        </div>
    </div>
    {openModal && <Members onClose={handleModalClose}/>}
    </>
  );
};

export default Sidebar;