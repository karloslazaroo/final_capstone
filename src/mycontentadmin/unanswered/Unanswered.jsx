import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './unanswered.css'
import Profile from '../../assets/profile1.jpg';
import { UserAuth } from '../../context/AuthContext';

function App () {
  const [talkList, setTalkList] = useState([]);
  const {  user } = UserAuth();

    useEffect(() => {
      const email = user.email;
      Axios.get(`https://aust-chatbot.herokuapp.com/readContentTalk/${email}`).then((response) => {
        // console.log(response.data);
        setTalkList(response.data);
      });
    }, [talkList]);


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
    
    <div className="body_Questions">
      <div className="textBox_announcement">
      <h2>Unanswered Questions<br></br></h2>
      </div>
      <div className='divider_announcement_user'></div>
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
          <div class="date">{val.date}</div>
          <div className="button_questions">
      <a href='Chatbot_Content'>Leave a reply</a>
      </div>
        </div>
        
      </div>
    </div>
    
          </div>
          );
        })}

  </div>
  {modal && (
        <div className="modal">
          <div className="modal-content">
          <div className="announcement">
            <h2><span>Question</span></h2>
            </div>
            <label>Question: </label>  
            <input className="name_ratings_user" type="text" placeholder="Type your title..." /*onChange={(event) => {setTitle(event.target.value);}}*/
            />
             <label>Answer: </label> 
            <textarea className="message_user"  placeholder="Write something.."  /*onChange={(event) => {
                setBody(event.target.value);
            }}*/></textarea>
            <div className="buttons_reviews_user">
      <button>Answer</button>
      <button onClick={toggleModal} >Close</button>
      </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;