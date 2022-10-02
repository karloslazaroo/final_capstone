import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './talktous.css';
import Swal from 'sweetalert2';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); //0 pag integer/number
  const [phone, setPhone] = useState(0);
  const [message, setMessage] = useState('');

  const addToList = () => {

    Swal.fire(
      'Thank you!',
      'Your message has been submitted!',
      'success'
    )
    

    Axios.post("http://localhost:3001/insertTalk", {
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
  };

  return (
    <div className="body_talktous">
      <div className="talktous_user">
            <h2><span>Talk to Us!</span></h2>
            <div className="divider"></div>
            </div>
            
    <div class="container">
    <div class="contact-box">
        <div class="left"></div>
        <div class="right">
            <h2>Contact Us</h2>
            <input type="text" class="field" placeholder="Your Name"
            onChange={(event) => {
              setName(event.target.value);
            }}/>
            <input type="text" class="field" placeholder="Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}/>
            <input type="text" class="field" placeholder="Phone"
            onChange={(event) => {
              setPhone(event.target.value);
            }}/>
            <textarea placeholder="Message" class="field"
            onChange={(event) => {
              setMessage(event.target.value);
            }}></textarea>
            <button class="btn" onClick={addToList}>Send</button>
        </div>
    </div>
    
</div>


</div>

  )
  
}

export default App;