import './chatbot.css';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [datas, setData] = useState([]);
  const [projId, setID] = useState('');
  const [mail, setMail] = useState('');
  const [time] = useState('Asia/Hong_Kong');
  //Generate new token every 1 hour in Postman
  const token = 'ya29.a0Aa4xrXO5N-Bnx8_83cy4hB5U9Y0f85K7apVvrs9i-c7SLZ7ULtlsXydrK5lICSdiG5O83FfR61ooaLLLcG0BIbV1KQvMRLLtedRW5jCHGyz_oiA6tCJ0-ugGnS3taHvHUtwsHqM_840IURlLGVcQgJqYeO6z7gaCgYKATASARASFQEjDvL9M42D6f605nsFZHK0oa8keA0165';

  /* const getData = ( ${projId} ) =>  {
  Axios.get(`https://dialogflow.googleapis.com/v2/projects/archie-fcoa/agent?access_token=${token}`).then((response) => {
    console.log([response.data])
    setData([response.data]);
  });
}; */
useEffect(() => {
  Axios.get('http://localhost:3001/readBot').then((response) => {
    setData(response.data);
  });
}, [setData]);

const addChatbot = (/** ${projId} */) => {
  Axios.post(`https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=${token}`, {
   displayName: name,
   timeZone: time,
 }).then(() => {
  Axios.post('http://localhost:3001/insertBot' , {
    mail: mail,
    projId: projId,
    name: name,
    time: time,
  });
 });
};


  return (
    <div className='chatbot_body'>
      
    <div className='chatbot_admin'>
      <div className='formChatbot_admin'>
      <div className="textBox">
        <h2>CHATBOT<br></br></h2>
        </div>
        <div className="divider"></div>
        <div className="chatbot_inputs">
        <label>Email of Content Admin: </label>  
            <input 
            className="chatbot_creation"
            type="text"
            placeholder="Type your email..." 
            onChange={(event) => {
              setMail(event.target.value);
            }}
            />
       <label>Project ID: </label>  
            <input 
            className="chatbot_creation"
            type="text"
            placeholder="Type your project ID..." 
            onChange={(event) => {
              setID(event.target.value);
            }}
            />
       <label>Name of Chatbot: </label>  
            <input 
            className="chatbot_creation"
            type="text"
            placeholder="Type the name of your chatbot..." 
            onChange={(event) => {
              setName(event.target.value);
            }}
            />
            <div className="button_add_content">
      <a href='#' onClick={addChatbot} >Create Chatbot!</a>
      </div>
      </div>
            
      </div>
      <div className="divider_chatbot"></div>
      {datas.map((val, key) => {
          return (
            
            <div key={key}>

            <div className="chatbotbox_admin">
    
              
              <h1> {val.name} </h1>
              <p>
                {val.projId}<br></br>
                {val.mail}
              </p>
            </div>
          </div>
          );
        })}

        
    </div>
    
    </div>

  )
}

export default App;