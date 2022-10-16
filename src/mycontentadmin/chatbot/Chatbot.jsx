// import React from 'react'
// import './chatbot.css'
// import gapi  from 'gapi';
// // "AIzaSyC8npgx-FL391Pv_v91L7x0A2iFCw98uQ0"

// const Chatbot = () => {
//   /**
//    * Sample JavaScript code for dialogflow.projects.agent.intents.create
//    * See instructions for running APIs Explorer code samples locally:
//    * https://developers.google.com/explorer-help/code-samples#javascript
//    */
//   const apikey = "AIzaSyC8npgx-FL391Pv_v91L7x0A2iFCw98uQ0";


//    function loadClient() {
//     gapi.client.setApiKey(apikey);
//     return gapi.client.load("https://dialogflow.googleapis.com/$discovery/rest?version=v2")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//     // Make sure the client is loaded and sign-in is complete before calling this method.
//     function execute() {
//       return gapi.client.dialogflow.projects.agent.intents.create({
//         "parent": "projects/isidore-lfji/agent",
//         "intentView": "INTENT_VIEW_FULL",
//         "resource": {
//           "trainingPhrases": [
//             {
//               "parts": [
//                 {
//                   "text": "Hi"
//                 }
//               ]
//             }
//           ],
//           "displayName": "Hi",
//           "messages": [
//             {
//               "simpleResponses": {
//                 "simpleResponses": [
//                   {
//                     "displayText": "Hello there"
//                   }
//                 ]
//               }
//             }
//           ]
//         }
//       })
//           .then(function(response) {
//                   // Handle the results here (response.result has the parsed body).
//                   console.log("Response", response);
//                 },
//                 function(err) { console.error("Execute error", err); });
//     }
//     gapi.load("client")
//   return (
//     <div className='chatbot_body_content'>
//        {/* <div className="textBox">
//       <h2>Chatbots!<br></br></h2>
//       </div>
//       <div className="container_chatbot">
//         <div className="create_intents">
//         CREATE INTENTS<br></br>
//         <label for="fname">Name: </label><br></br>
//         <input type="text" id="fname" placeholder='"Name of your Intent"' name="fname"></input><br></br>
  
//         TRAINING PHRASES<br></br>
//         <input type="text" id="fname" placeholder='"1. I need your help"' name="fname"></input><br></br>
//         <input type="text" id="fname" placeholder='"2. Add user expression"' name="fname"></input><br></br>
//         RESPONSES<br></br>
//         <input type="text" id="fname" placeholder='"1. How can I help you"' name="fname"></input><br></br>
//         <input type="text" id="fname" placeholder='"2. Add your response here"' name="fname"></input><br></br>
//         </div>
        
//         <div className="your_intents">
//         YOUR INTENTS
//         </div>

//         <div className="history">
//         HISTORY
//         </div>
//     </div> */}
//     <script src="https://apis.google.com/js/api.js"></script>
//     <script>
//       {loadClient()}
//       {execute()}
//     </script>

//     <button onclick="loadclient()">load</button>
//     <button onclick="execute()">execute</button>


    
//   </div>
//   )
// }

// export default Chatbot