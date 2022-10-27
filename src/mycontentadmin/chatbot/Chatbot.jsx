import React , {useEffect, useState} from 'react'
import './chatbot.css'
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';



function Chatbot (){

  const {user} = UserAuth();
  const intentdisplaycontainer = [];
  const responsecontainer = [];
 
    const [detectintentdata, setdetectintentdata] = useState([]);
    const [agentdata, setAgentdata] = useState([]) ;
    const [projectiddata, setprojectiddata]= useState('');
    const [inputtrainingphrase, setinputtrainingphrase] = useState('');
    const [inputbotresponse, setinputbotresponse] = useState('');
 




  const token = "ya29.a0Aa4xrXNqmD8lPp48-yvJlKWBHL_2JEVNJqw1gmP34Af1csU8SNqlSvBSQUEovroS6ERVF2peZ-LQaP462upZxMdt4bSd9U9MfjqW6t0iYPc-abwZ-bc2h2n1cgomTayWFs4GwRgttk5e51N_coF19SI126MYcgaCgYKATASARASFQEjDvL9WLv1SXITjVamp0t8URameg0165";
  // urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  useEffect(() => {
    getIntents();
    // getAgents();
    getprojectId();
  }
  ,[]
  );

  //get specific project id, store project id to variable, use variable to get intents
  //project id also used for creating intent

  const getprojectId = () =>{
    const mail = user.email;
    console.log('email',user.email);
    axios.get(`http://localhost:3001/readBot/${mail}`).then((response) => {
      // console.log('getproject id', response.data.projId);
      // setState( {projectiddata : response.data});
      // console.log(projectiddata);
      console.log(response.data.projId);
      setprojectiddata(response.data.projId);
    });
  }


  // getAgents = () =>{
    
  //   axios.get('http://localhost:3001/readBot').then((response) => {
  //       setState({agentdata: response.data});
  //     });
  // }

  const createIntent = (event) =>{
    event.preventDefault();
    const trainingphrasecontainer = inputtrainingphrase;
    const responsecontainer = inputbotresponse;

    const displayname = '"displayName" : '+ '"'+trainingphrasecontainer+ '"';
    const trainingphrase = '"text" : '+ '"'+trainingphrasecontainer+ '"';
    const displaytext = '"displayText" : '+ '"'+responsecontainer+ '"';
    var data = '{'+displayname+', "trainingPhrases": [ { "parts": [ {'+trainingphrase+'}]}],"messages": [{"simpleResponses": {"simpleResponses": [{'+displaytext +'}]}}]}';

    var config = {
    method: 'post',
    url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents?access_token='+ token,
    headers: { 
        'Content-Type': 'text/plain'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    // console.log('create intent success');
    alert('Create intent success!');
    resetuserInputs();
    getIntents();
    })
    .catch(function (error) {
    console.log(error);
    alert('Create intent failed')
    });
  }

  const resetuserInputs = () =>{
    setinputtrainingphrase('');
    setinputbotresponse('');
    // const texttraining = document.getElementById("inputtrainingphrase");
    // const textbotresponse = document.getElementById("inputbotresponse");
    // texttraining.innerHTML('');
    // textbotresponse.innerHTML('');
  }

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   useState({ [name]: value });
  // };


  
  const getIntents = () => {
 

    var config = {
      method: 'get',
      url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents?access_token='+ token,
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
     }
    };

    axios(config)
    .then((response) => {
      const data = JSON.stringify(response.data.intents);
      console.log(data);
      // console.log('data received');
      // const testvariable = data[1].messages[0].simpleResponses.simpleResponses[0].displayText;
      //   intentdisplaycontainer.push(testvariable);
     
      // intentdisplaycontainer.push(data);

      // console.log('data dded to state');
      // console.log(data[1].messages[0].simpleResponses.simpleResponses[0].displayText, 'from axios code');
      // setState({detectintentdata : data})
      setdetectintentdata(data);


      
    })
    .catch((error) => {
      console.log(error);
      alert('error on axios');
    });

  };
  
  const displayIntentData = (detectintentdata) =>{
   console.log(typeof(detectintentdata));
    return (
        <div >
            {detectintentdata}
        </div>
    
        )  
  }

  const displayagents = (agentdata) => {
    console.log(agentdata);
    return agentdata.map((val, key) => {
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
            )
        }
    )
  }

  
  console.log('State response: ', inputbotresponse);
  console.log('State trainingphrase: ', inputtrainingphrase);
    return (
            <div className='chatbot_body_content'>
                
            <p>{displayIntentData(detectintentdata)}</p>

            <div className='createintentform'>
              <form onSubmit={createIntent}>
              
              <div className="form-input">
                <input 
                  type="text"
                  name="inputtrainingphrase"
                  placeholder="Enter training phrase"
                  id='inputtrainingphrase'
                  value={inputtrainingphrase}
                  onChange={(event) => {
                    setinputtrainingphrase(event.target.value);
                  }}
                />
              </div>


              <div className="form-input">
                <textarea
                  placeholder="Enter chatbot response"
                  name="inputbotresponse"
                  cols="30"
                  rows="10"
                  id='inputbotresponse'
                  value={inputbotresponse}
                  onChange={(event) => {
                    setinputbotresponse(event.target.value);
                  }}
                >
                  
                </textarea>
              </div>
         
                <p><button>Submit</button></p>   
              </form>


              
            </div>
           
            {/* <p>{displayagents(agentdata)} </p> */}

          
        
        </div>
        ) 
  }
 
  
  



// function getprojectId(){
//   // console.log(UserAuth());

//   const mail = user.email;
//       axios.get(`http://localhost:3001/readBot/${mail}`).then((response) => {
//         console.log('getproject id', response.data);
//         // setState( {projectiddata : response.data});
//         // console.log(projectiddata);
//       });

// }


export default Chatbot;