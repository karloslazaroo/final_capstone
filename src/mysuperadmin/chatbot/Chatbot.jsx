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
  const [token, setToken] = useState('');
  const [updateToken, setUpdateToken] = useState('');
  //Generate new token every 1 hour in Postman
  //const token = 'ya29.a0AeTM1if687PcMMqijxbSfzvpDMijbfIpSNFxPT99bVtEd4UwJaRq5pqYI7iAJg5O3SXuwXw1WLYJqhlK1yWj2kdI6hHTVh2Myvu-5b7y5jD3iE-XCBUlFyMikVP_mRPeKevrS74o5ACB5OmxouwsBQmZJSDELgaCgYKATwSARASFQHWtWOmEX8lFrHgao1cCg3g1_M9TQ0165';

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
  Axios.get('https://aust-chatbot.herokuapp.com/readBot').then((response) => {
    setData(response.data);
    console.log('readbot ',response.data);
  });
}

const addToken = (/** ${projId} */) => {
  if(token == "") {
    alert('Valid Access Token Required.');
  } else {
    setUpdateToken(token);
    console.log(updateToken);

    Swal.fire({
      title:'Thank you!',
      text:'Access Token Added!',
      icon:'success',
      confirmButtonColor: '#f7ce05'
     });

     document.getElementById("token").value = '';
  }
};


const addChatbot = (/** ${projId} */) => {
  if(name == "" || projId == "" || mail == "") {
    alert('All fields required.');
  } else {
    Axios.post(`https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=${updateToken}`, {
    displayName: name,
    timeZone: time,
  }).then(() => {
    Axios.post('https://aust-chatbot.herokuapp.com/insertBot' , {
      mail: mail,
      projId: projId,
      name: name,
      time: time,
    },
    getBots()
    );
    Swal.fire({
      title:'Thank you!',
      text:'Chatbot Has been Created!',
      icon:'success',
      confirmButtonColor: '#f7ce05'
     });
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
      Axios.delete(`https://dialogflow.googleapis.com/v2/projects/${projId}/agent?access_token=${updateToken}`).then(() => {
        Axios.delete(`https://aust-chatbot.herokuapp.com/deleteBot/${id}`,
        getBots(),
        );
      });
      Swal.fire({
        title:'Deleted!',
        text:'Your file has been deleted.',
        icon:'success',
        confirmButtonColor: '#f7ce05'

    })
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
       <div className="token_input">
        <label>Acces Token from Postman: </label>
         
            <input id="token"
            className='tokeninput'
            type="text"
            placeholder="Enter access token..." 
            onChange={(event) => {
              setToken(event.target.value);
            }}
            />
             <button href='#' onClick={addToken} className='token'>Use Access Token!</button>
             </div>

             <div className="divider_admin2"></div>

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
            <div className="button_chatbot_content">
      <button href='#' onClick={addChatbot} >Create Chatbot!</button>
      <button><a href='https://dialogflow.cloud.google.com/#/' target="_blank">Manage Chatbot</a></button>
      </div>
      <div className="divider_admin"></div>
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
            <div className="button_chatbot_content">
            <button href="#" onClick={() => deleteBot(val._id, val.projId)}> Delete </button>
            <button> <a href={'https://dialogflow.cloud.google.com/#/agent/'+val.projId+'/intents'} target="_blank">Manage</a> </button>
            </div>
          </div>
          );
        })}
    </div>
    
    </div>

  )
}

export default App;