import React, { useEffect, useState } from 'react';
import settings  from './settings';
import mqtt from 'mqtt';

const App = () => {

  const  [topics, setTopics]  = useState([]);

  function addTopic(topic){
     if (topics.includes(topic)){return;}
     const newTopics = topics.push(topic);
     setTopics(newTopics);  
  }
  useEffect(() => {
    const options = {
      username: settings.BROKER_LOGIN,
      password: settings.BROKER_PASSWORD,
      port: settings.BROKER_PORT,
    };
 
   const client = mqtt.connect(`${settings.BROKER_PROTOCOL}://${settings.BROKER_IP}${settings.BROKER_URL_PATH.startsWith('/') ? settings.BROKER_URL_PATH : `/${settings.BROKER_URL_PATH}`}`, options);

   if (client){

    client.on('connect',  () => {
      console.log("connected");
    });

    client.on('error', (err) => {
      console.error('Connection error: ', err);
    });

    client.subscribe("#", function (err) {
      console.log(`subscribing...`);
      if (err) {
        console.log(`error subscribing...`);
        console.log(err);
      }
    });
     
    client.on('message', (topic, message) => {
      if (!topic.includes("SAFE_ENCRYPTED")){
        addTopic(topic);
       // console.log(message)
        handleBrokerMessage(topic, message); 
      }
     });  
   }
  }, []);

  const handleBrokerMessage = (topic, payload) => {  
     console.log(JSON.parse(payload.toString()))   
     console.log(topic)  
  };
  
  console.log(topics);
  // eslint-disable-next-line array-callback-return
  return <>{topics}</>;
};

export default App;
