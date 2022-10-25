import React from 'react'
import './chatbot.css'
import axios from 'axios';


class Chatbot extends React.Component {

 
  intentdisplaycontainer = [];
  responsecontainer = [];
  state = {
    detectintentdata: [],
    agentdata : [],
    inputtrainingphrase: '',
    inputbotresponse: ''
  };

  token = "ya29.a0Aa4xrXMm9o1kEgphh_LRuwmrRVAhOaiCLCsVbIE2DtRsxfwWtp2NykUAIS1c0oTyDxCJzZExu_bpgCTEzdjyF34X-sA5k-p-1WCkKS3ur45ewoRY6i78KV4PklITNPfvj8_fbIqQrUXIzCNL3sVZndNa98dxOAaCgYKATASARMSFQEjDvL9Lv7Q6MFxRd4pdZNTsEOAWw0165";
  // urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  componentDidMount = () => {
    this.getIntents();
    // this.getAgents();
    
  }

  getAgents = () =>{
    
    axios.get('http://localhost:3001/readBot').then((response) => {
        this.setState({agentdata: response.data});
      });
  }

  createIntent = (event) =>{
    event.preventDefault();
    const trainingphrasecontainer = this.state.inputtrainingphrase;
    const responsecontainer = this.state.inputbotresponse;

    const displayname = '"displayName" : '+ '"'+trainingphrasecontainer+ '"';
    const trainingphrase = '"text" : '+ '"'+trainingphrasecontainer+ '"';
    const displaytext = '"displayText" : '+ '"'+responsecontainer+ '"';
    var data = '{'+displayname+', "trainingPhrases": [ { "parts": [ {'+trainingphrase+'}]}],"messages": [{"simpleResponses": {"simpleResponses": [{'+displaytext +'}]}}]}';

    var config = {
    method: 'post',
    url: 'https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token='+ this.token,
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  
  getIntents = () => {
 

    var config = {
      method: 'get',
      url: this.urlcontainer+ this.token,
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
    console.log('State response: ', this.state.inputbotresponse);
    console.log('State trainingphrase: ', this.state.inputtrainingphrase);
    return (
            <div className='chatbot_body_content'>
                
            <p>{this.displayIntentData(this.state.detectintentdata)}</p>

            <div className='createintentform'>
              <form onSubmit={this.createIntent}>
              
              <div className="form-input">
                <input 
                  type="text"
                  name="inputtrainingphrase"
                  placeholder="Title"
                  value={this.state.inputtrainingphrase}
                  onChange={this.handleChange}
                />
              </div>


              <div className="form-input">
                <textarea
                  placeholder="body"
                  name="inputbotresponse"
                  cols="30"
                  rows="10"
                  value={this.state.inputbotresponse}
                  onChange={this.handleChange}
                >
                  
                </textarea>
              </div>
         
                <p><button>Submit</button></p>   
              </form>


              
            </div>
           
            {/* <p>{this.displayagents(this.state.agentdata)} </p> */}


        
        </div>
        ) 
  }
 
  
  
}


export default Chatbot;