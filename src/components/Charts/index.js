import React, {useEffect, useState} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = (props) => {
  const data = props.measures;

  const [measuresList, setMeasuresList] = useState([]);

  const formatXAxis = (tick) => {
      return tick.split(" ")[1];
  }

  const colors = ["#00008B", '#2E8B57', "#B8860B", "#800000", "#C71585"]

  function getMeasures(){

   const list = [];
   for (let keyMeasure in data[0]) {
       if (data[0].hasOwnProperty(keyMeasure)) {
          const measure = {key: keyMeasure, measure:  data[0][keyMeasure] }
          if (measure.key !== "topic" && measure.key !== "idBIoT" && measure.key !== "dataHoraMedicao" ) list.push(measure);           
       }
    }
    setMeasuresList(list);
  }   

   useEffect(() => {
       getMeasures();        
    });

   return (  
        <LineChart
          width={1500}
          height={700}
          data={data}
          key={`${data.dataHoraMedicao}`}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dataHoraMedicao" tickFormatter={formatXAxis}/>
          <YAxis />
          <Tooltip />
          <Legend />                
          {measuresList.map((measureItem, index) => 
              (<Line key={index} type="monotone"  dot={false}  dataKey={measuresList[index].key} stroke={colors[index]} />  ) )}                   
        </LineChart>
   );
 };
 
 export default Chart;
 