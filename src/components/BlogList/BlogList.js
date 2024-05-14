import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../services/Api-service';
import Card from '../Card/Card';
import './BlogList.css';
import Search from '../Search/Search';
import { handleImageError } from '../../utils/common-utils';
import { FALLBACK_IMAGE } from '../../constants/common-constants';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogsData, setSearchTerm, setSelectedBlog, setImageLoaded, setShowNewBlogModal, updateSelectedBlog, setEditMode } from '../../store/blogSlice';
import NewBlogModal from '../NewBlog/NewBlog';
import AlertDialog from '../Dialog/AlertDialog';
import { getItemFromLocalStorage } from '../../utils/local-storage-utils';
import { BUTTONS, IMAGE_LOADING, NO_BLOGS_FOUND, WARNING_MODAL } from '../../constants/blog-constants';


const BlogList = () => {
    //Dispatch
    const dispatch = useDispatch();
    const blogsData = useSelector((state) => state.blog.blogsData);
    const searchTerm = useSelector((state) => state.blog.searchTerm);
    const selectedBlog = useSelector((state) => state.blog.selectedBlog);
    const imageLoaded = useSelector((state) => state.blog.imageLoaded);
    const showNewBlogModal = useSelector((state) => state.blog.showNewBlogModal);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const selectedFilters = useSelector((state) => state.blog.selectedFilters);
    const editMode = useSelector((state) => state.blog.editMode);

    //States
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [clickedBlog, setClickedBlog] = useState(null);

    const titleInputRef = useRef(null);

   
    /**
     * Fetch the data from API
     */
    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const storedBlogs = JSON.parse(getItemFromLocalStorage('blogs'));
          if(storedBlogs?.length){
            dispatch(setBlogsData(storedBlogs));
            dispatch(setSelectedBlog(storedBlogs[0]));
          } else {
            const data = await fetchData('resources/blogs.json');
            dispatch(setBlogsData(data));
            dispatch(setSelectedBlog(data[0]));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchDataFromApi();
    }, [dispatch]);

      /**
   * Focus the title input when edit mode is enabled
   */
  useEffect(() => {
    if (editMode && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editMode]);


    /**
     * Set loader until image is loaded
     */
    const handleImageLoaded = () => {
      dispatch(setImageLoaded(true));
    };

    const filteredBlogs = blogsData?.filter(
      (item) => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((item) => selectedFilters.includes(item.type));;


    /**
     * Handle Warning modal Cancel
     */
    const handleAlertClose = () => {
      setShowWarningModal(false);
    }

    /**
     * Handle Warning modal Okay
     */
    const handleAlertOkay = () => {
      setShowWarningModal(false);
      dispatch(setEditMode(!editMode));
      dispatch(setSelectedBlog(clickedBlog));
    }

    /**
     * Handle Clicks
     * @param {*} option 
     * @param {*} blogDetails 
     */
    const handleClick = (option, blogDetails) => {
      switch(option) {
        case BUTTONS.NEW_BLOG:
          dispatch(setShowNewBlogModal(true));
          break;
        case BUTTONS.CANCEL:
          dispatch(setShowNewBlogModal(false));
          break;
        case BUTTONS.BLOG:
          if(editMode){
            setClickedBlog(blogDetails);
            setShowWarningModal(true);
          } else {
            dispatch(setSelectedBlog(blogDetails));
          }
          break;
        case BUTTONS.SAVE_CONTENT:
          dispatch(updateSelectedBlog(selectedBlog));
          dispatch(setEditMode(false));
          break;
        case BUTTONS.EDIT_CONTENT:
          dispatch(setEditMode(!editMode));
          
          break;
        default: 

        }
      }
    

  return (
    <div className={`blog-container ${darkMode ? 'dark' : ''}`}>
        <div className='blog-list'>
            <div className='blog-list-header'>
                <Search 
                  className='search-input' 
                  value={searchTerm} 
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
                  placeholder='Search Blogs' 
                  type='text'
                />
                <button className='new-blog' onClick={() => handleClick(BUTTONS.NEW_BLOG)}>{BUTTONS.NEW_BLOG}</button>
            </div>
            <ul className='card-list'>
                {filteredBlogs.length ? ( 
                  filteredBlogs?.map(item => {
                    return (
                        <li key={item.title} className={`card ${selectedBlog && selectedBlog.title === item.title ? 'active' : ''}`} onClick={() => handleClick(BUTTONS.BLOG, item)}>
                            <Card 
                                key={item.title}
                                title={item.title}
                                type={item.type}
                                description={item.details}
                            />
                         </li>
                    )
                })) : (
                  <p className='no-blogs-found'>{NO_BLOGS_FOUND}</p>
                )}
            </ul>
        </div>
        
        
        <div className='detailed-description'>
            {selectedBlog &&
            <>
                {!imageLoaded && <div className="loader">{IMAGE_LOADING}</div>}
                <img
                    src={selectedBlog.photo || FALLBACK_IMAGE}
                    alt={selectedBlog.title}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                />
                {editMode ? ( 
                  <>
                    <input type='text' ref={titleInputRef} className='selected-blog-title' value={selectedBlog.title} onChange={(e) => dispatch(setSelectedBlog({ ...selectedBlog, title: e.target.value }))}></input>
                    <textarea
                      value={selectedBlog.details}
                      onChange={(e) => dispatch(setSelectedBlog({ ...selectedBlog, details: e.target.value }))}
                      className='selected-blog-details'
                      />
                    <button onClick={() => handleClick(BUTTONS.SAVE_CONTENT)} className='save-content-btn'>{BUTTONS.SAVE_CONTENT}</button>
                  </>
                ) : (
                  <>
                    <h1 className='selected-blog-title'>{selectedBlog.title}</h1>
                    <p className='selected-blog-details'>{selectedBlog.details}</p>
                  </>
                )}
                
                <button onClick={() => handleClick(BUTTONS.EDIT_CONTENT)}>
                  {editMode ? BUTTONS.CANCEL : BUTTONS.EDIT_CONTENT}
                </button>
            </>  
            }
        </div>
        {showNewBlogModal && <NewBlogModal onClose={() => handleClick(WARNING_MODAL.CANCEL)} />}
        {showWarningModal && <AlertDialog title={WARNING_MODAL.TITLE} content={WARNING_MODAL.CONTENT} cancelText={WARNING_MODAL.CANCEL} okayText={WARNING_MODAL.OKAY} handleAlertClose={handleAlertClose} handleAlertOkay={handleAlertOkay}/>}

    </div>
  );
};

export default BlogList;
