import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt';
import Header from '../../components/Header';
import settings  from '../../settings';
import {  useParams } from "react-router-dom"
import Chart from '../../components/Charts';
import "./index.css"

const RealTime = () => {

  const  [messages, setMessages]  = useState([]);

  const {id, topic} = useParams();
    
    const options = {
      username: settings.BROKER_LOGIN,
      password: settings.BROKER_PASSWORD,
      port: settings.BROKER_PORT,
    };
    
    const client = mqtt.connect(`${settings.BROKER_PROTOCOL}://${settings.BROKER_IP}${settings.BROKER_URL_PATH.startsWith('/') ? settings.BROKER_URL_PATH : `/${settings.BROKER_URL_PATH}`}`, options);
    
      client.on('connect',  () => {
    //    console.log("connected");
      });
    
      client.on('error', (err) => {
       // console.error('Connection error: ', err);
      });
    
      client.subscribe(topic, function (err) {
    //    console.log(`subscribing...`);
        if (err) {
      //   console.log(`error subscribing...`);
        //  console.log(err);
        }
      });

      useEffect(() => {
        client.on('message', (topic, message) => {
          const messageParsed = JSON.parse(message.toString())       
          if (messageParsed.idBIoT === id) {
          handleBrokerMessage(messageParsed)
          }      
      })},[50]);

      const handleBrokerMessage = (payload) => {
        const message = payload;
        message.topic = topic;    
     
        setMessages(oldArray => [...oldArray, message]);      
      };

      console.log(messages)

    return  (
    <div>      
      <Header/>  
      <div className='chartContainer'> 
      <Chart measures={messages}/>
      </div>
   </div>);
  };

export default RealTime;
