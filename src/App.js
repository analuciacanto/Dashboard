import React, {  useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Card from './components';
import settings  from './settings';
import { useStateVar } from './hooks/useStateVar.ts';

const App = () => {

  const  [topics, setTopics]  = useState([]);
  const  [messages, setMessages, render]  = useStateVar([]);

  function addTopic(topic){
    if (topics.includes(topic)) return;
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

  return  (
  <div>   
              {
                messages.map((message)=> (
                    <Card key={message.idBIoT} measures={message}/>
                ))
              }

 </div>);
};

export default App;
