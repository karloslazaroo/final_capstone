import React , {useEffect, useState} from 'react'
import './chatbot.css'
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';




function Chatbot (){

  const {user} = UserAuth();

    const [projectiddata, setprojectiddata]= useState('');
    const [inputtrainingphrase, setinputtrainingphrase] = useState('');
    const [inputbotresponse, setinputbotresponse] = useState('');
    const [inputIntentName, setInputIntentName] = useState('');
    const [datas, setData] = useState([]);
    const [dataaa, setDataaa] = useState([]);
 

  const token = "ya29.a0AeTM1if687PcMMqijxbSfzvpDMijbfIpSNFxPT99bVtEd4UwJaRq5pqYI7iAJg5O3SXuwXw1WLYJqhlK1yWj2kdI6hHTVh2Myvu-5b7y5jD3iE-XCBUlFyMikVP_mRPeKevrS74o5ACB5OmxouwsBQmZJSDELgaCgYKATwSARASFQHWtWOmEX8lFrHgao1cCg3g1_M9TQ0165";
  // urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  useEffect(() => {
    
    //getIntents();
    // getAgents();
    /* const mail = user.email;
    console.log('email',user.email);
    axios.get(`http://localhost:3001/readBot/${mail}`).then( async (response) => {
      console.log(response.data.projId);
      setprojectiddata(response.data.projId);
      
    });
    ListIntent(); */
    const mail = user.email;
    axios.get(`https://aust-chatbot.herokuapp.com/readBots/${mail}`).then((response) => {
    setData(response.data);
    // console.log(response.data.projId);
    //setprojectiddata(response.data.projId);
  })
}, [datas]);

  //get specific project id, store project id to variable, use variable to get intents
  //project id also used for creating intent

  /* const getprojectId = () =>{
    
  } */
/*  const Bot = () => {
    
    console.log(user.email)
    axios.get(`http://localhost:3001/readBot/${user.email}`).then((response) => {
    setData(response.data);
    console.log('readbot ',response.data);
    })
  }; */

  function ListIntent(id) {
        axios.get(`https://dialogflow.googleapis.com/v2/projects/`+id+`/agent/intents?intentView=INTENT_VIEW_FULL&access_token=${token}`).then((responses) => {
        const intentss = responses.data.intents.length;

        const intentsss = [];
        for(var i = 0; i < intentss; i++) {
            intentsss.push(responses.data.intents[i])
        }
        console.log(intentsss);
        setDataaa(intentsss);
        });
  }


  const createIntent = (event) =>{
    event.preventDefault();
    const trainingphrasecontainer = inputtrainingphrase;
    const responsecontainer = inputbotresponse;
    const intentName = inputIntentName;

    const displayname = '"'+intentName+ '"';
    const trainingphrase = '{ "parts": [ {"text" : "'+trainingphrasecontainer+'"}]}';
    const displaytext = '"'+responsecontainer+ '"';
    var data = '{"displayName": '+displayname+', "trainingPhrases": [ '+trainingphrase+'],"messages": [{"text": {"text": ['+displaytext+']}}]}';


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
  
    alert('Create intent success!');
    resetuserInputs();
   
    ListIntent(projectiddata);
    })
    .catch(function (error) {
    console.log(error);
    alert('Create intent failed')
    });
  }

  const resetuserInputs = () =>{
    setinputtrainingphrase('');
    setinputbotresponse('');
    setInputIntentName('');
 
  }

//   const testenv = async () =>{
//     const {google} = require('googleapis');
//     const apis = google.getSupportedAPIs();
   
//     var express = require('express'); 
//     var app = express();
//     const myclientid = "70270798745-j2leqftddodgiumh307t952c402h60sl.apps.googleusercontent.com";

//     const myclientsecret = "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";
//     const tokenurl = 'https://accounts.google.com/o/oauth2/token';
//     const myscope = 'https://www.googleapis.com/auth/dialogflow';
//     const myauthurl = 'https://accounts.google.com/o/oauth2/auth';
//     const redirecturl = 'https://www.getpostman.com/oauth2/callback';

//     const oauth2Client = new google.auth.OAuth2(
//       myclientid,
//       myclientsecret,
//       redirecturl, 
//     );
    
//     // generate a url that asks permissions for Blogger and Google Calendar scopes
//     const scopes = [
//       'https://www.googleapis.com/auth/dialogflow'
      
//     ];
    
//     console.log('code goes b4 generateurl');
//     const url = oauth2Client.generateAuthUrl({
//       // 'online' (default) or 'offline' (gets refresh_token)
//       access_type: 'offline',
    
//       // If you only need one scope you can pass it as a string
//       scope: scopes


//     });
  
//     // This will provide an object with the access_token and refresh_token.
//     // Save these somewhere safe so they can be used at a later time.
//     const {tokens} = await oauth2Client.getToken(code)
//     oauth2Client.setCredentials(tokens);
//     console.log(oauth2Client.getAccessToken);

//   };
//  testenv();

  
  const deleteIntent = (projectid) => {
    var config = {
      method: 'delete',
      url: 'https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents/'+projectid+'/?access_token='+token,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert('delete success');
      ListIntent();
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  const getprojectID = (projectid) =>{
    // console.log('test project id display', projectid);

    var actualprojectidcontainer = "";
    var slashcount = 0 ;
    var stoppingindex = 0;
    for (var i = 0; i < projectid.length ; i++ ){
    
      if  (projectid[i] == "/")  {
        slashcount += 1;
        continue;
       
      }

      if (slashcount == 4){
        console.log('stop at index', i);
        stoppingindex = i;
        break;
      }
    }

    for (var i = stoppingindex; i <projectid.length; i++){
      actualprojectidcontainer += projectid[i];
    }
    // console.log('number of slashes', slashcount);
    console.log('actual project id', actualprojectidcontainer);
    return actualprojectidcontainer;
    const url = 'https://dialogflow.cloud.google.com/#/agent/temporal-data-362507/editIntent/'+actualprojectidcontainer+'/';
  }

const openDialog = (projectid) => {
  
}

    
  // console.log('State response: ', inputbotresponse);
  // console.log('State trainingphrase: ', inputtrainingphrase);
  // console.log('State editdisplayname: ', editdisplayname);
  // console.log('State edittrainingphrase: ', edittrainingphrase);
  // console.log('State editbotresponse: ', editbotresponse);


  const success = () => {
    createIntent();
    toggleModal();
    
  }

  const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }


    
    

    return (
            <div className='chatbot_body_content'>
                
            {/* <p>{displayIntentData(detectintentdata)}</p> */}
    
            <div className="textBox">
      <h2>Chatbot<br></br></h2>
      </div>
      <div className="divider"></div>
    <div className="button_add_content">
      {/* <button href='#' onClick={toggleModal}>New Intent!</button> */}
    </div>
    
    
    <div className="intents">
          <div className="intents_content">
              <h2>YOUR CHATBOTS</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
              <div className="divider_content"></div>
              <div className='scroll'>
              {/* {dataaa.map((val, key) => {
                return (
                  <div key={key}>
                    <div className="box_intents">
                      <center><h3> {val.displayName} </h3></center>
                    </div>
                    <p><button onClick={() => deleteIntent(getprojectID(val.name))}>Delete Intent</button></p>
                </div>
                );
              })} */}
              {datas.map((val, key) => {
                return (
                  <div key={key}>
                    <div className="box_yourchatbots">
                      <h3>{val.name}</h3>
                      {/* <a onClick={() => ListIntent(val.projId)}><u>View Intents</u></a>
                      <a>-----</a> */}
                      <a href={'https://dialogflow.cloud.google.com/#/agent/'+val.projId+'/intents'} target="_blank"><u>Manage Intent</u> </a>
                    </div>
                    
                    {/* <p><button onClick={() => deleteIntent(getprojectID(val.name))}>Delete Intent</button></p> */}
                </div>
                );
              })}
              </div>

          </div>

         {/*  {<div  className="edit_intents">
          <h2>INTENTS</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
          
              <div className="divider_content"></div>
              <div className="scroll">
              {dataaa.map((val, key) => {
                return (
                  <div key={key}>
                    <div className="box_intents">
                      <center><h3> {val.displayName} </h3></center>
                    </div>
                    { <p><button><a href={'https://dialogflow.cloud.google.com/#/agent/temporal-data-362507/editIntent/293c06b5-a7fa-4155-a96e-785df0040463/'} target="_blank">Manage Intent</a></button></p> }
                    {<p><button onClick={() => deleteIntent(getprojectID(val.name))}>Delete Intent</button></p> }
                </div>
                );
              })}
          </div>
          </div>} */}

    </div>

{modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span> Create Intents!</span></h2>
            </div>
            <label>Name: </label>  
            <input 
            className="intents_name"
            type="text"
            placeholder="Type your title..." id='inputIntentName'
            value={inputIntentName}
            onChange={(event) => {
              setInputIntentName(event.target.value);
            }}
           
            />
             <label>Training phrases: </label> 
            <input className="training"  placeholder="Write something.." id='inputtrainingphrase'
                  value={inputtrainingphrase}
                  onChange={(event) => {
                    setinputtrainingphrase(event.target.value);
                  }}  ></input>
            <label>Responses: </label> 
            <input className="training"  placeholder="Write something.."   id='inputbotresponse'
                  value={inputbotresponse}
                  onChange={(event) => {
                    setinputbotresponse(event.target.value);
                  }}></input>
            <div className="buttons_reviews_user">
      <button href='#' onClick={createIntent}>Submit</button>
      <button href='#' onClick={toggleModal}>Close</button>
      </div>
          </div>
        </div>
      )}
        
        </div>
        ) 
  }


export default Chatbot;