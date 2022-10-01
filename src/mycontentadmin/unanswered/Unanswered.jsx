import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './unanswered.css'
import Profile from '../../assets/profile1.jpg'

function App () {
  const [talkList, setTalkList] = useState([]);

    useEffect(() => {
      Axios.get('http://localhost:3001/readTalk').then((response) => {
        setTalkList(response.data);
      });
    }, [talkList]);

  return (
    
    <div className="body_Questions">
      <div className="textBox">
      <h2>Unanswered Questions<br></br></h2>
      </div>
      <div class="wrapper_questions">
      {talkList.map((val, key) => {
          return (
            <div key={key}>
            <div class="box_questions_contentadmin">
            <i class="fas fa-quote-left quote"></i>
      <p>{val.message}</p>
      <div class="content_questions">
        <div class="info_questions">
          <div class="name">{val.name}</div>
          <div class="job">Designer | Developer</div>
          <div className="button_questions">
      <a href='#'>Answer now!</a>
      </div>
        </div>
        <div class="image">
          <img src={Profile} alt=""/>
        </div>
      </div>
    </div>

          </div>
          );
        })}

  </div>
    </div>
  )
}

export default App;