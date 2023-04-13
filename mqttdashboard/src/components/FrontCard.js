import React, {useState, useEffect} from 'react';
import './styles.css';

const FrontCard = (props) => {

   const measures = props.measures;
   const [measuresList, setMeasuresList] = useState([]);

   function getMeasures(){

    const list = [];
    for (let keyMeasure in measures) {
        if (measures.hasOwnProperty(keyMeasure)) {
           const measure = {key: keyMeasure, measure:  measures[keyMeasure] }
           list.push(measure);           
        }
     }
     setMeasuresList(list);
   }   

    useEffect(() => {
        getMeasures();        
      });

  return (  
    <div className="content">  
      <h1>{props.measures.topic}</h1>    
      {measuresList.map((measureItem)=> (
        measureItem.key !== "topic" &&
            <div className="sensor-info">
            <p>{measureItem.key + ""}</p>
            <p>
            <p>{measureItem.measure}</p>
            </p>
       </div>          
      ))}            
    </div>
  );
};

export default FrontCard;
