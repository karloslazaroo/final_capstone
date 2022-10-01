import React from 'react'
import './chatbot.css'

const Chatbot = () => {
  return (
    <div className='chatbot_body_content'>
      <div className="container_chatbot">
        <div className="create_intents">
        CREATE INTENTS<br></br>
        <label for="fname">Name: </label><br></br>
        <input type="text" id="fname" placeholder='"Name of your Intent"' name="fname"></input><br></br>
  
        TRAINING PHRASES<br></br>
        <input type="text" id="fname" placeholder='"1. I need your help"' name="fname"></input><br></br>
        <input type="text" id="fname" placeholder='"2. Add user expression"' name="fname"></input><br></br>
        RESPONSES<br></br>
        <input type="text" id="fname" placeholder='"1. How can I help you"' name="fname"></input><br></br>
        <input type="text" id="fname" placeholder='"2. Add your response here"' name="fname"></input><br></br>
        </div>
        
        <div className="your_intents">
        YOUR INTENTS
        </div>

        <div className="history">
        HISTORY
        </div>
    </div>
  </div>
  )
}

export default Chatbot