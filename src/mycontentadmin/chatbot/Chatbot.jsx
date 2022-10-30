import React , {useEffect, useState} from 'react'
import './chatbot.css'
import axios from 'axios';
import { UserAuth } from '../../context/AuthContext';



function Chatbot (){

  const {user} = UserAuth();

 

    const [projectiddata, setprojectiddata]= useState('');
    const [inputtrainingphrase, setinputtrainingphrase] = useState('');
    const [inputbotresponse, setinputbotresponse] = useState('');
    const [datas, setData] = useState([]);
    const [dataaa, setDataaa] = useState([]);
    const [edittrainingphrase, setedittrainingphrase] = useState('');
    const [editbotresponse, seteditbotresponse] = useState('');
    const [editdisplayname, seteditdisplayname] = useState('');
 




  const token = "ya29.a0Aa4xrXODJSBq9hB-imF0jvXkJXL0itv0shRdSoWcp-vwLIJiGzC_K00mAZcA-R-5Gh6-Oojw6LTXrYIMKBEosgUVoqufKh6p6kg33Omp8DWRjkxOq8YgDq3EvgYZ_TWH8P5aY_FShzQANFMjCpio9O3naXklKgaCgYKATASARMSFQEjDvL9qEYeQz8u9grsKtgkXZdNbQ0165";
  // urlcontainer = "https://dialogflow.googleapis.com/v2/projects/isidore-lfji/agent/intents?access_token="

  useEffect(() => {
    //getIntents();
    // getAgents();
    const mail = user.email;
    console.log('email',user.email);
    axios.get(`http://localhost:3001/readBot/${mail}`).then( async (response) => {
      // console.log('getproject id', response.data.projId);
      // setState( {projectiddata : response.data});
      // console.log(projectiddata);
      console.log(response.data.projId);
      setprojectiddata(response.data.projId);
      
    });
    ListIntent();
  }, []);

  //get specific project id, store project id to variable, use variable to get intents
  //project id also used for creating intent

  /* const getprojectId = () =>{
    
  } */

  function ListIntent() {
        axios.get(`https://dialogflow.googleapis.com/v2/projects/`+projectiddata+`/agent/intents?intentView=INTENT_VIEW_FULL&access_token=${token}`).then((responses) => {
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

    const displayname = '"'+trainingphrasecontainer+ '"';
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
   
    ListIntent();
    })
    .catch(function (error) {
    console.log(error);
    alert('Create intent failed')
    });
  }

  const resetuserInputs = () =>{
    setinputtrainingphrase('');
    setinputbotresponse('');
    seteditdisplayname('');
    seteditbotresponse('');
    setedittrainingphrase('');
 
  }

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   useState({ [name]: value });
  // };


  
  // const getIntents = () => {
 

  //   var config = {
  //     method: 'get',
  //     url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents?intentView=INTENT_VIEW_FULL&access_token='+ token,
  //     headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+ token
  //    }
  //   };

  //   axios(config)
  //   .then((response) => {
  //     const data = JSON.stringify(response.data.intents);
  //     console.log(data);
  //     // console.log('data received');
  //     // const testvariable = data[1].messages[0].simpleResponses.simpleResponses[0].displayText;
  //     //   intentdisplaycontainer.push(testvariable);
     
  //     // intentdisplaycontainer.push(data);

  //     // console.log('data dded to state');
  //     // console.log(data[1].messages[0].simpleResponses.simpleResponses[0].displayText, 'from axios code');
  //     // setState({detectintentdata : data})
  //     setdetectintentdata(data);


      
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     alert('error on axios');
  //   });

  // }; 
  
  // const displayIntentData = (detectintentdata) =>{
  //  console.log(typeof(detectintentdata));
  //   return (
  //       <div >
  //           {detectintentdata}
  //       </div>
    
  //       )  
  // }

  const updateIntent = (event) =>{
    event.preventDefault();

    const displaynamecontainer = '"'+editdisplayname+'"';
    const trainingphrasecontainer = '{ "parts": [ {"text" : "'+edittrainingphrase+'"}]}';
    const botrepliescontainer = '"'+editbotresponse +'"';
    var data = '{"displayName": '+displaynamecontainer+',"trainingPhrases": ['+trainingphrasecontainer+'],"messages": [ {"text": {"text": ['+botrepliescontainer+'] }}  ] }';
    
    console.log(data);
    // '{"displayName": "hephep","trainingPhrases": [ {"parts":[  {"text": "hephpehpehpe"}]}, {"parts": [{"text": "waku waku"}]}  ],"messages": [ {"text": {"text": ["memes","eelelelel"] }}  ] }';

    var config = {
      method: 'patch',
      url: 'https://dialogflow.googleapis.com/v2/projects/'+projectiddata+'/agent/intents/293c06b5-a7fa-4155-a96e-785df0040463?access_token='+token ,
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("update success");
      resetuserInputs();
      ListIntent();
    })
    .catch(function (error) {
      console.log(error);
      alert("update failure");
    });

  };






    
  console.log('State response: ', inputbotresponse);
  console.log('State trainingphrase: ', inputtrainingphrase);
  console.log('State editdisplayname: ', editdisplayname);
  console.log('State edittrainingphrase: ', edittrainingphrase);
  console.log('State editbotresponse: ', editbotresponse);
    return (
            <div className='chatbot_body_content'>
                
            {/* <p>{displayIntentData(detectintentdata)}</p> */}
            <div>
    {dataaa.map((val, key) => {
      return (
        <div key={key}>
        <div className="box_questions">
          <i className="fas fa-quote-left quote"></i>
          <center><h1> {val.displayName} {val.name} </h1></center>
          <p>
            {/* {val.projId}<br></br>
            {val.mail} */}
          </p>
        </div>
      </div>
      );
    })}
    </div>
    
    <h3>Create Intent</h3>
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
                  rows="5"
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


              {/* ===========EDIT INTENT FORM================================= */}
              <hr></hr>
              <h3>Edit Intent</h3>
              <form onSubmit={updateIntent}>
              
              <div className="form-input">
                <input 
                  type="text"
                  name="editdisplayname"
                  placeholder="Enter new display name"
                  id='editdisplayname'
                  value={editdisplayname}
                  onChange={(event) => {
                    seteditdisplayname(event.target.value);
                  }}
                />
              </div>


              <div className="form-input">
                <textarea
                  placeholder="Enter training phrase to be edited"
                  name="edittrainingphrase"
                  cols="30"
                  rows="5"
                  id='edittrainingphrase'
                  value={edittrainingphrase}
                  onChange={(event) => {
                    setedittrainingphrase(event.target.value);
                  }}
                >
                  
                </textarea>
              </div>

              <div className="form-input">
                <textarea
                  placeholder="Enter bot response to be edited"
                  name="editbotresponse"
                  cols="30"
                  rows="5"
                  id='editbotresponse'
                  value={editbotresponse}
                  onChange={(event) => {
                    seteditbotresponse(event.target.value);
                  }}
                >
                  
                </textarea>
              </div>
         
                <p><button>Update Intent</button></p>   
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