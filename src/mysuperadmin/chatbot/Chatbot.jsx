import './chatbot.css';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';

function App() {
  const [name, setName] = useState('');
  const [datas, setData] = useState([]);
  const [projId, setID] = useState('');
  const [mail, setMail] = useState('');
  const [time] = useState('Asia/Hong_Kong');
  //Generate new token every 1 hour in Postman
  const token = 'ya29.a0Aa4xrXPu2a77RcMrAEJ4RFogU8Me_jlfnXXMbYEeUva-8NRwsNHmo-3tNxsT1-KK4IGR487VMHdONq0md2FWKTaBRFoBYSpLcTZJFR1vmA4o9aWZ__PWw_63QhcbX8hPMCZ4DCHpvFFTt48lakMOQU2BCzIOGgaCgYKATASARASFQEjDvL9BvCEowg7zTds7AA6-WXEhQ0165';

  /* const getData = ( ${projId} ) =>  {
  Axios.get(`https://dialogflow.googleapis.com/v2/projects/archie-fcoa/agent?access_token=${token}`).then((response) => {
    console.log([response.data])
    setData([response.data]);
  });
}; */
useEffect(() => {
  getBots();

}
, []
);

function getBots(){
  Axios.get('http://localhost:3001/readBot').then((response) => {
    setData(response.data);
    console.log('readbot ',response.data);
  });
}

const addChatbot = (/** ${projId} */) => {
  if(name == "" || projId == "" || mail == "") {
    alert('All fields required.');
  } else {
    Axios.post(`https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=${token}`, {
    displayName: name,
    timeZone: time,
  }).then(() => {
    Axios.post('http://localhost:3001/insertBot' , {
      mail: mail,
      projId: projId,
      name: name,
      time: time,
    },
    getBots()
    );
    Swal.fire(
      'Thank you!',
      'Chatbot Has been Created!',
      'success'
    );
    document.getElementById("email").value = '';
    document.getElementById("projId").value = '';
    document.getElementById("bot").value = '';
    });
  }
};

const deleteBot = (id, projId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=${token}`).then(() => {
        Axios.delete(`http://localhost:3001/deleteBot/${id}`,
        getBots(),
        );
      });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
 
};

function displayBots(){
  return(
    datas.map((val, key) => {
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
    })
  );

}

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
            <input id="email"
            className="chatbot_creation"
            type="text"
            placeholder="Type your email..." 
            onChange={(event) => {
              setMail(event.target.value);
            }}
            />
       <label>Project ID: </label>  
            <input id="projId"
            className="chatbot_creation"
            type="text"
            placeholder="Type your project ID..." 
            onChange={(event) => {
              setID(event.target.value);
            }}
            />
       <label>Name of Chatbot: </label>  
            <input id="bot"
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
            <a href="#" onClick={() => deleteBot(val._id, val.projId)}> Delete </a>
          </div>
          );
        })}
    </div>
    
    </div>

  )
}

export default App;