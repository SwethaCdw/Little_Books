
import React from 'react';
import './Card.css';

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

export default Card;