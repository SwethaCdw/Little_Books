import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../../services/Api-service';
import Card from '../Card/Card';
import './BlogList.css';
import Search from '../Search/Search';
import { handleImageError } from '../../utils/common-utils';
import { FALLBACK_IMAGE } from '../../constants/common-constants';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogsData, setSearchTerm, setSelectedBlog, setImageLoaded, setShowNewBlogModal, updateSelectedBlog } from '../../store/blogSlice';
import NewBlogModal from '../NewBlog/NewBlog';
import AlertDialog from '../Dialog/AlertDialog';
import { getItemFromLocalStorage } from '../../utils/local-storage-utils';


const BlogList = () => {
    const dispatch = useDispatch();
    const blogsData = useSelector((state) => state.blog.blogsData);
    const searchTerm = useSelector((state) => state.blog.searchTerm);
    const selectedBlog = useSelector((state) => state.blog.selectedBlog);
    const imageLoaded = useSelector((state) => state.blog.imageLoaded);
    const showNewBlogModal = useSelector((state) => state.blog.showNewBlogModal);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const selectedFilters = useSelector((state) => state.blog.selectedFilters);
    const [editMode, setEditMode] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [clickedBlog, setClickedBlog] = useState(null);
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const textareaRef = useRef(null); 

    const handleNewBlogClick = () => {
      dispatch(setShowNewBlogModal(true));
    };
  
    const handleCloseModal = () => {
      dispatch(setShowNewBlogModal(false));
    };

    const adjustTextareaHeight = () => {
      if (textareaRef?.current) {
        setTextareaHeight(`${textareaRef?.current.scrollHeight}px`);
      }
    };

    const handleEditContent = () => {
      setEditMode(!editMode);
      if (editMode) {
        adjustTextareaHeight(); 
      }
    };  

    const handleSaveContent = () => {
      dispatch(updateSelectedBlog(selectedBlog));
      setEditMode(false); 
    };

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

    const handleImageLoaded = () => {
      dispatch(setImageLoaded(true));
    };

    const filteredBlogs = blogsData?.filter(
      (item) => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter((item) => selectedFilters.includes(item.type));;

    const handleBlogClick = (blogDetails) => {
      if(editMode){
        setClickedBlog(blogDetails);

        setShowWarningModal(true);
      } else {
        dispatch(setSelectedBlog(blogDetails));
      }
    }

    const handleAlertClose = () => {
      setShowWarningModal(false);
    }

    const handleOkay = () => {
      setShowWarningModal(false);
      setEditMode(!editMode);
      dispatch(setSelectedBlog(clickedBlog));

    }


  return (
    <div className={`blog-container ${darkMode ? 'dark' : ''}`}>
        <div className='blog-list'>
            <div className='blog-list-header'>
                <Search 
                  className='search-input' 
                  value={searchTerm} 
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
                  placeholder='Search Blog' 
                  type='text'
                />
                <button className='new-blog' onClick={handleNewBlogClick}>NEW</button>
            </div>
            <ul className='card-list'>
                {filteredBlogs.length ? ( 
                  filteredBlogs?.map(item => {
                    return (
                        <li key={item.title} className={`card ${selectedBlog && selectedBlog.title === item.title ? 'selected' : ''}`} onClick={() => handleBlogClick(item)}>
                            <Card 
                                key={item.title}
                                title={item.title}
                                type={item.type}
                                description={item.details}
                            />
                         </li>
                    )
                })) : (
                  <p className='no-blogs-found'>No blogs found.</p>
                )}
            </ul>
        </div>
        <div className='detailed-description'>
            {selectedBlog &&
            <>
                {!imageLoaded && <div className="loader">Loading...</div>}
                <img
                    src={selectedBlog.photo || FALLBACK_IMAGE}
                    alt={selectedBlog.title}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                />
                {editMode ? ( 
                  <>
                    <input type='text' className='selected-blog-title' value={selectedBlog.title} onChange={(e) => dispatch(setSelectedBlog({ ...selectedBlog, title: e.target.value }))}></input>
                    <textarea
                      ref={textareaRef} 
                      value={selectedBlog.details}
                      onChange={(e) => dispatch(setSelectedBlog({ ...selectedBlog, details: e.target.value }))}
                      className='selected-blog-details'
                      style={{ height: textareaHeight }}
                      />
                    <button onClick={handleSaveContent} className='save-content-btn'>SAVE CONTENT</button>
                  </>
                ) : (
                  <>
                    <h1 className='selected-blog-title'>{selectedBlog.title}</h1>
                    <p className='selected-blog-details'>{selectedBlog.details}</p>
                  </>
                )}
                
                <button onClick={handleEditContent}>
                  {editMode ? 'CANCEL' : 'EDIT CONTENT'}
                </button>
            </>  
            }
        </div>
        {showNewBlogModal && <NewBlogModal onClose={handleCloseModal} />}
        {showWarningModal && <AlertDialog title='Do you wish stop the edit?' cancelText='Cancel' okayText='Yes' handleAlertClose={handleAlertClose} handleOkay={handleOkay}/>}

    </div>
  );
};

export default BlogList;
