import React from 'react';
import FrontCard from './FrontCard';
import './styles.css';

const Card = (props) => {
  
  return (
    <div className="card-container-holder">
    <div className={'card-container'}>
      <div className="card-face front-card-container">
        <div className={'alert-bar normal'}>          
          </div>
          <FrontCard
            name={props.measures.topic}
            measures={props.measures}
          />                  
      </div>
       </div>
  </div>
   
  );
};


export default Card;
