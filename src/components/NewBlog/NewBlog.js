import React, { useRef, useState } from 'react';
import './NewBlog.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog } from '../../store/blogSlice';

const NewBlogModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({ title: '', details: '', type: 'Local', photo: '' });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };


  const handleBlogForm = async (e) => {
    e.preventDefault();
    dispatch(addNewBlog(formData)); 
    onClose();
  }

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
        <h2>Add a New Blog</h2>
        <form onSubmit={handleBlogForm}>
          <div className='form-input'>
            <input
              placeholder='Title'
              name='title'
              className='title'
              type='text'
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-input'>
            <textarea placeholder='Content' name='details' id='details' value={formData.details} onChange={handleInputChange}></textarea>
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
              Click here to choose your image
            </p>
          </div>
          {selectedImage && (
            <div className='selected-image'>
              <img src={selectedImage} alt='Selected' />
            </div>
          )}
          <button type="submit" className='blog-submit-btn'>SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogModal;
