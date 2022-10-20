import React, { useState } from "react";
import { UserAuth } from '../../context/AuthContext';
import Axios from 'axios';
import './talktous.css';
import Swal from 'sweetalert2';

function App() {
  const {user} = UserAuth();
  const name = user.displayName;
  const email = user.email; //0 pag integer/number
  const [message, setMessage] = useState('');

  const state = {
    source: ''
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  const addToList = () => {

    Swal.fire(
      'Thank you!',
      'Your message has been submitted!',
      'success'
    ) 

    Axios.post("http://localhost:3001/insertTalk", {
      name: name,
      email: email,
      message: message,
    });

    Axios.post("http://localhost:3001/analyticsdata",{
      source: state.source
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
            <textarea placeholder="Message" class="field"
            onChange={(event) => {
              setMessage(event.target.value);
            }}></textarea>


            <input 
              type="hidden"
              name="source"
              placeholder="source"
              value={state.source = "Talk to Us"}
              onChange={handleChange}
            />

            <button class="btn" onClick={addToList}>Send</button>
        </div>
    </div>
    
</div>


</div>

  )
  
}

export default App;