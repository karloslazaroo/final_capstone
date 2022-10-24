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
  const token = 'ya29.a0Aa4xrXM_D41_9A5Bg8B12oldOZyQmOVelFusJoJxH82UPRd4wjn2wVIVqtaTDPcUuVNdi3eJuwHmmXZTP5Bvgp7OTplZ481wK4eTK5yvqsGZc9nG3qE82RlU7YhcDhT__AE8exp96NQ6A9tn3HgEn1R57jeYWAaCgYKATASARASFQEjDvL9W4IpBnaFar9NsQoxoTd8nw0165';

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
    <div className='bodyLogin'>
    <div className='login'>
      <div className='formLogin'>
        <h1>CHATBOT</h1>
        <label>Email of Content Admin: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setMail(event.target.value);
            }}
            />
       <label>Project ID: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setID(event.target.value);
            }}
            />
       <label>Name of Chatbot: </label>  
            <input 
            className="name_ratings_user"
            type="text"
            placeholder="Type your title..." 
            onChange={(event) => {
              setName(event.target.value);
            }}
            />
            <button onClick={addChatbot} >Create Chatbot</button>
       
      </div>
      {datas.map((val, key) => {
          return (
            <div key={key}>
            <div className="box_questions">
              <i className="fas fa-quote-left quote"></i>
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