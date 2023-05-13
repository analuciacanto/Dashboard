import React, {  useState } from 'react';
import mqtt from 'mqtt';
import Card from '../../components/Card';
import Header from '../../components/Header';
import settings  from '../../settings';
import { useStateVar } from '../../hooks/useStateVar.ts';
import "./index.css"
import { useNavigate } from "react-router-dom";

const Monitor = () => {

    const  [topics, setTopics]  = useState([]);
    const  [messages, setMessages, render]  = useStateVar([]);
  
    
    const navigate = useNavigate()

    function renderRealtTime(id, topic){
      console.log("cliqueeei");
      navigate(`/realTime/${topic}/${id}`, { replace: true, state: { id: id, topic: topic }});    
    }
    function addTopic(topic){
      if (topics.length !== 0 && topics.includes(topic)) return;
      const newTopics =  topics;
      newTopics.push(topic);
      setTopics(newTopics);   
    }
  
   const options = {
      username: settings.BROKER_LOGIN,
      password: settings.BROKER_PASSWORD,
      port: settings.BROKER_PORT,
    };
    
    const client = mqtt.connect(`${settings.BROKER_PROTOCOL}://${settings.BROKER_IP}${settings.BROKER_URL_PATH.startsWith('/') ? settings.BROKER_URL_PATH : `/${settings.BROKER_URL_PATH}`}`, options);
    
      client.on('connect',  () => {
      //  console.log("connected");
      });
    
      client.on('error', (err) => {
      //  console.error('Connection error: ', err);
      });
    
      client.subscribe("#", function (err) {
        console.log(`subscribing...`);
        if (err) {
         // console.log(`error subscribing...`);
          //console.log(err);
        }
      });
     
    client.on('message', (topic, message) => {
      if (topic !== "SAFE_ENCRYPTED"){
        addTopic(topic);
        handleBrokerMessage(topic, message); 
      }     
     });    
    
    const handleBrokerMessage = (topic, payload) => {
      const message = JSON.parse(payload.toString()) 
      message.topic = topic;
      const actualMessageIndex = messages.findIndex((m) => m.idBIoT === message.idBIoT);
      if (actualMessageIndex >= 0) {
         messages.splice(actualMessageIndex, 1);
      }  
      const messagesList = messages;
      messagesList.push(message);
      setMessages(messagesList);
      render();
    };

    function getMeasures(measures){
 
     const list = [];
     for (let keyMeasure in measures) {
         if (measures.hasOwnProperty(keyMeasure)) {
            const measure = {key: keyMeasure, measure:  measures[keyMeasure] }
            list.push(measure);           
         }
      }
      return list;
    }        
   
    return  (
    <div>   
      <Header/>
      <div className='grid'> 
                {
                  messages.map((message)=> (
                      <Card key={message.idBIoT} measures={getMeasures(message)} topic={message.topic} onClick={()=> renderRealtTime(message.idBIoT, message.topic)}/>
                  ))
                }
        </div>
  
   </div>);
  };

export default Monitor;
