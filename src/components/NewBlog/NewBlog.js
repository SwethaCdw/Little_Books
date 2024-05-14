import React, { useRef, useState } from 'react';
import './NewBlog.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog } from '../../store/blogSlice';
import { LOCAL_TYPE, NEW_BLOG } from '../../constants/blog-constants';

const NewBlogModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({ title: '', details: '', type: LOCAL_TYPE, photo: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);


  /**
   * Handle input change
   * @param {*} e 
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handle choose image
   */
  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };


  /**
   * Handle new blog submission
   * @param {*} e 
   */
  const handleBlogForm = async (e) => {
    e.preventDefault();
    dispatch(addNewBlog(formData)); 
    onClose();
  }

  /**
   * Handle file input change
   * @param {*} e 
   */
  const handleFileInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, photo: event.target.result });
      setSelectedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className={`modal-content ${darkMode ? 'dark' : ''} `}  onClick={(e) => e.stopPropagation()}>
        <h2>{NEW_BLOG.ADD_NEW_BLOG}</h2>
        <form onSubmit={handleBlogForm}>
          <div className='form-input'>
            <input
              placeholder={NEW_BLOG.TITLE}
              name='title'
              className='title'
              type='text'
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-input'>
            <textarea placeholder={NEW_BLOG.CONTENT} name='details' id='details' value={formData.details} onChange={handleInputChange} required></textarea>
          </div>
          <div className='form-input'>
          <input
              type='file'
              id='fileInput'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <p className='choose-file-button' onClick={handleChooseFileClick}>
             {NEW_BLOG.CHOOSE_IMAGE}
            </p>
          </div>
          {selectedImage && (
            <div className='selected-image'>
              <img src={selectedImage} alt='Selected' />
            </div>
          )}
          <button type="submit" className='blog-submit-btn'>{NEW_BLOG.SUBMIT}</button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogModal;
