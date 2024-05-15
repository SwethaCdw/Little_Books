
import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = (props) => {
    const { title, type, description } = props; 

  return (
    <div className='card-container'>
       <h3 className='title'>{title}</h3>
       <p className='type'>{type.toUpperCase()}</p>
       <p className='description' title={description.toUpperCase()}>{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;