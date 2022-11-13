import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { UserAuth } from '../../context/AuthContext';
import './ratings.css';
import Swal from 'sweetalert2';

import Profile from '../../assets/profile1.jpg'

function App() {
    const {user} = UserAuth();
    const name = user.displayName;
    const email = user.email;
    const [message, setMessage] = useState(''); //0 pag integer/number
    const [approval] = useState('Pending');
    const [reviewList, setReviewList] = useState([]);
    const source = "Reviews";
   
  
    useEffect(() => {
      Axios.get('https://aust-chatbot.herokuapp.com/readReviewUser').then((response) => {
        setReviewList(response.data);
      });
    }, [reviewList]);
  
    const addToList = () => {
      if(message == ""){
        alert('All fields are required.')
      } else{
        Swal.fire({
          title:'Thank you!',
          text:'Your message has been submitted!',
          icon:'success',
          confirmButtonColor: '#f7ce05'
      })
  
        Axios.post("https://aust-chatbot.herokuapp.com/insertReview", {
          name: name,
          message: message,
          approval: approval,
          email: email,
        });

        Axios.post("https://aust-chatbot.herokuapp.com/analyticsdata",{
          source: source,
          date: new Date(Date.now()).toLocaleDateString()
        }).then(console.log('sent source'));
      }
    };


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const Restart = () => {
    addToList();
    toggleModal();
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div>
       <div className="ratings_user">
            <h2><span>Review Us!</span></h2>
            <div className="divider_ratings_user"></div>
            </div>
        
   <div className="button_user">
      <a href='#'onClick={toggleModal}>You can add yours now!</a>
      </div>
    <div className='ratings_body'>
    <div class="wrapper">

    {reviewList.map((val, key) => {
      return (
                <div key={key}>
                  <div class="box">
      <i class="fas fa-quote-left quote"></i>
      <p>{val.message}</p>
      <div class="content">
        <div class="info">
          <div class="name_user">{val.name}</div>
          <div class="job_user">{val.email}</div>
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
            <h2><span>Write a review!</span></h2>
            </div>
             <label>Message: </label> 
            <textarea className="message_user"  placeholder="Write something.."  onChange={(event) => {
                setMessage(event.target.value);
            }}></textarea>
            
            <div className="buttons_reviews_user">

            
      <a href='#'onClick={Restart} >Submit</a>
      <a href='#'onClick={toggleModal} >Close</a>
      </div>
          </div>
        </div>
      )}
    </div>
   
    </div>
  )
}

export default App;