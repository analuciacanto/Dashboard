import './styles.css';

const FrontCard = (props) => {

  const measures = props.measures;
  console.log(measures);

  return (  
    <div className="content">  
      <h1>{props.name}</h1>    
      {measures.map((measureItem)=> (
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
