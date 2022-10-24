import React from 'react'
import './chatbot.css'
import axios from 'axios';


class Chatbot extends React.Component {

  apikey = "AIzaSyC8npgx-FL391Pv_v91L7x0A2iFCw98uQ0";
  intentdisplaycontainer = [];
  responsecontainer = [];
  state = {detectintentdata: [], agentdata : []};
  token = "ya29.a0Aa4xrXNih4t_HOTve2AvPGQHH57qpwHk0MQSJJbqMmFMrVvttBdPqkzCKASOiHbRcCUCaAVWNSEevBmDifIvE712Vue3Z70Rb9-r-3ppNWk9w5GbZ6zAGUqvCFYui_UvtRUdBdsziIKyXCEktferF19DFVH4sQaCgYKATASARMSFQEjDvL9PIGvr0R7iEPwK2Kue9gfYA0165";
  urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  componentDidMount = () => {
    this.getIntents();
    this.getAgents();
    
  }

  getAgents = () =>{
    
    axios.get('http://localhost:3001/readBot').then((response) => {
        this.setState({agentdata: response.data});
      });
  }

  

  
  getIntents = () => {
 

    var config = {
      method: 'get',
      url: 'https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token='+ this.token,
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token
     }
    };

    axios(config)
    .then((response) => {
      const data = JSON.stringify(response.data.intents);
      console.log(data);
      // console.log('data received');
      // const testvariable = data[1].messages[0].simpleResponses.simpleResponses[0].displayText;
      //   this.intentdisplaycontainer.push(testvariable);
     
      // this.intentdisplaycontainer.push(data);

      // console.log('data dded to state');
      // console.log(data[1].messages[0].simpleResponses.simpleResponses[0].displayText, 'from axios code');
      this.setState({detectintentdata : data})


      
    })
    .catch((error) => {
      console.log(error);
      alert('error on axios')
    });

  };
  
  displayIntentData = (detectintentdata) =>{
   console.log(typeof(detectintentdata));
    return (
        <div >
            {detectintentdata}
        </div>
    
        )  
  }

  displayagents = (agentdata) => {
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

  render(){
    return (
            <div className='chatbot_body_content'>
                
            <p>{this.displayIntentData(this.state.detectintentdata)}</p>

          
            <p><button onclick={()=> createIntent()} className='execute'>execute</button></p>
            
            <p>{this.displayagents(this.state.agentdata)} </p>


        
        </div>
        ) 
  }
 
  
  
}

function createIntent(){
    var data = '{\r\n        "displayName": "Testing",\r\n        "trainingPhrases": [\r\n          {\r\n            "parts": [\r\n              {\r\n                "text": "Testing"\r\n              }\r\n            ]\r\n          }\r\n        ],\r\n        "messages": [\r\n          {\r\n            "simpleResponses": {\r\n              "simpleResponses": [\r\n                {\r\n                  "displayText": "Test complete"\r\n                }\r\n              ]\r\n            }\r\n          }\r\n        ]\r\n      }\r\n\r\n';

    var config = {
    method: 'post',
    url: 'https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token=ya29.a0Aa4xrXNih4t_HOTve2AvPGQHH57qpwHk0MQSJJbqMmFMrVvttBdPqkzCKASOiHbRcCUCaAVWNSEevBmDifIvE712Vue3Z70Rb9-r-3ppNWk9w5GbZ6zAGUqvCFYui_UvtRUdBdsziIKyXCEktferF19DFVH4sQaCgYKATASARMSFQEjDvL9PIGvr0R7iEPwK2Kue9gfYA0165',
    headers: { 
        'Content-Type': 'text/plain'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    console.log('create intent success');
    })
    .catch(function (error) {
    console.log(error);
    });
}

export default Chatbot;